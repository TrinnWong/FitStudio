using System.Threading.Tasks;

namespace FitStudio.Application.Interfaces
{
    public interface INotificationService
    {
        Task SendPushNotificationAsync(string userId, string message);
        Task SendEmailAsync(string email, string subject, string body);
    }
}
