using System;
using System.Threading.Tasks;

namespace FitStudio.Application.Interfaces
{
    public interface IPaymentService
    {
        Task<string> CreateCheckoutSessionAsync(Guid clientId, Guid membershipId, string provider);
        Task ProcessWebhookAsync(string json, string signature, string provider);
    }
}
