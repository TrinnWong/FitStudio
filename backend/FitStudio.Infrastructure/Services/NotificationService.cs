using FitStudio.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FitStudio.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public NotificationService(IConfiguration configuration)
        {
            _configuration = configuration;
            _httpClient = new HttpClient();
        }

        public async Task SendPushNotificationAsync(string userId, string message)
        {
            var appId = _configuration["OneSignal:AppId"];
            var restKey = _configuration["OneSignal:RestApiKey"];

            var payload = new
            {
                app_id = appId,
                contents = new { en = message },
                include_external_user_ids = new[] { userId }
            };

            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Basic {restKey}");

            await _httpClient.PostAsync("https://onesignal.com/api/v1/notifications", content);
        }

        public async Task SendEmailAsync(string email, string subject, string body)
        {
            var appId = _configuration["OneSignal:AppId"];
            var restKey = _configuration["OneSignal:RestApiKey"];

            // OneSignal Email API payload
            var payload = new
            {
                app_id = appId,
                email_subject = subject,
                email_body = body,
                include_email_tokens = new[] { email }
            };

            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Basic {restKey}");

            // Note: OneSignal email delivery requires proper setup in the dashboard.
            await _httpClient.PostAsync("https://onesignal.com/api/v1/notifications", content);
        }
    }
}
