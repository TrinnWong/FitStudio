using System.Threading.Tasks;
using FitStudio.Application.DTOs;

namespace FitStudio.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task<AuthResponse> ClientLoginAsync(LoginRequest request);
        Task<bool> ForgotPasswordAsync(string email);
        string HashPassword(string password);
        bool VerifyPassword(string password, string hash);
    }
}
