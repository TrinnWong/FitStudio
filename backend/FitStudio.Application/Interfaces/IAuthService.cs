using System.Threading.Tasks;
using FitStudio.Application.DTOs;

namespace FitStudio.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task<AuthResponse> ClientLoginAsync(LoginRequest request);
        Task<bool> ForgotPasswordAsync(string email);
        Task<bool> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> VerifyCodeAsync(VerifyRegisterRequest request);
        string HashPassword(string password);
        bool VerifyPassword(string password, string hash);
    }
}
