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
        private readonly PasswordHasher<User> _userHasher;
        private readonly PasswordHasher<Client> _clientHasher;

        public AuthService(FitStudioDbContext context)
        {
            _context = context;
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
            return new AuthResponse { Email = user.Email, Role = user.Role, Token = "MOCKED_TOKEN" };
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
