using System;
using System.Threading.Tasks;
using FitStudio.Application.DTOs;
using FitStudio.Application.Interfaces;
using FitStudio.Domain.Entities;
using FitStudio.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FitStudio.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly FitStudioDbContext _context;
        private readonly INotificationService _notificationService;
        private readonly PasswordHasher<User> _userHasher;
        private readonly PasswordHasher<Client> _clientHasher;

        public AuthService(FitStudioDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
            _userHasher = new PasswordHasher<User>();
            _clientHasher = new PasswordHasher<Client>();
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.Include(u => u.Studio)
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || _userHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            {
                throw new Exception("Invalid credentials");
            }

            // JWT Generation logic would go here
            return new AuthResponse 
            { 
                Email = user.Email, 
                Role = user.Role, 
                Token = "MOCKED_TOKEN",
                StudioId = user.StudioId.ToString()
            };
        }

        public async Task<AuthResponse> ClientLoginAsync(LoginRequest request)
        {
            // For clients, the email is in the Client table
            var client = await _context.Clients.FirstOrDefaultAsync(c => c.Email == request.Email);

            if (client == null || _clientHasher.VerifyHashedPassword(client, client.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            {
                throw new Exception("Invalid credentials");
            }

            return new AuthResponse { Email = client.Email, Role = "Client", Token = "MOCKED_TOKEN" };
        }

        public async Task<bool> ForgotPasswordAsync(string email)
        {
            // Generate 6-digit code logic
            return true;
        }

        public async Task<bool> RegisterAsync(RegisterRequest request)
        {
            // Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                throw new Exception("Email already registered");
            }

            // Generate 6-digit verification code
            var random = new Random();
            var code = random.Next(100000, 999999).ToString();

            // Remove any existing pending codes for this email to avoid duplicates
            var existingCodes = await _context.VerificationCodes
                .Where(v => v.Email == request.Email)
                .ToListAsync();
            
            if (existingCodes.Any())
            {
                _context.VerificationCodes.RemoveRange(existingCodes);
            }

            // Store pending registration in database
            var pending = new VerificationCode
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                Code = code,
                DataJson = System.Text.Json.JsonSerializer.Serialize(request),
                ExpiryDate = DateTime.UtcNow.AddHours(24),
                IsUsed = false
            };

            _context.VerificationCodes.Add(pending);
            await _context.SaveChangesAsync();

            // Send email via OneSignal
            var body = $"Your FitStudio verification code is: {code}";
            await _notificationService.SendEmailAsync(request.Email, "Verify your FitStudio account", body);

            return true;
        }

        public async Task<AuthResponse> VerifyCodeAsync(VerifyRegisterRequest request)
        {
            var pending = await _context.VerificationCodes
                .FirstOrDefaultAsync(v => v.Email == request.Email && v.Code == request.Code && !v.IsUsed && v.ExpiryDate > DateTime.UtcNow);

            if (pending == null)
            {
                throw new Exception("Código inválido, expirado o ya utilizado.");
            }

            var registerData = System.Text.Json.JsonSerializer.Deserialize<RegisterRequest>(pending.DataJson);
            if (registerData == null) throw new Exception("Datos de registro inválidos.");

            // Check if user already exists (last second check)
            if (await _context.Users.AnyAsync(u => u.Email == registerData.Email))
            {
                throw new Exception("El usuario ya se encuentra registrado con este correo electrónico.");
            }

            // Simple slug generation without uniqueness check
            var slug = registerData.StudioName.ToLower().Replace(" ", "-");

            // Code verified, create Studio and User
            var studio = new Studio
            {
                Id = Guid.NewGuid(),
                Name = registerData.StudioName,
                Slug = slug
            };

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = registerData.Email,
                PasswordHash = HashPassword(registerData.Password),
                Role = "StudioOwner",
                StudioId = studio.Id
            };

            try 
            {
                _context.Studios.Add(studio);
                _context.Users.Add(user);
                
                // Mark code as used
                pending.IsUsed = true;
                
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Log the detailed error or check inner exception
                var innerMessage = ex.InnerException?.Message ?? ex.Message;
                throw new Exception($"Error al guardar en la base de datos: {innerMessage}");
            }

            return new AuthResponse 
            { 
                Email = user.Email, 
                Role = user.Role, 
                Token = "MOCKED_TOKEN_AFTER_REGISTER",
                StudioId = studio.Id.ToString()
            };
        }

        public string HashPassword(string password)
        {
            // Simple usage, can be refined
            return _userHasher.HashPassword(null!, password);
        }

        public bool VerifyPassword(string password, string hash)
        {
            return _userHasher.VerifyHashedPassword(null!, hash, password) != PasswordVerificationResult.Failed;
        }
    }
}
