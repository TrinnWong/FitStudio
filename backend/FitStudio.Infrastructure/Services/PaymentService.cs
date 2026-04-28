using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FitStudio.Application.Interfaces;
using FitStudio.Infrastructure.Persistence;
using Stripe;
using Stripe.Checkout;

namespace FitStudio.Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly FitStudioDbContext _context;
        private readonly IMembershipService _membershipService;

        public PaymentService(FitStudioDbContext context, IMembershipService membershipService)
        {
            _context = context;
            _membershipService = membershipService;
        }

        public async Task<string> CreateCheckoutSessionAsync(Guid clientId, Guid membershipId, string provider)
        {
            if (provider.ToLower() == "stripe")
            {
                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string> { "card" },
                    LineItems = new List<SessionLineItemOptions>
                    {
                        new SessionLineItemOptions
                        {
                            PriceData = new SessionLineItemPriceDataOptions
                            {
                                UnitAmount = 2000, // Hardcoded for demo
                                Currency = "usd",
                                ProductData = new SessionLineItemPriceDataProductDataOptions
                                {
                                    Name = "Membership Plan",
                                },
                            },
                            Quantity = 1,
                        },
                    },
                    Mode = "payment",
                    SuccessUrl = "https://example.com/success",
                    CancelUrl = "https://example.com/cancel",
                    Metadata = new Dictionary<string, string>
                    {
                        { "clientId", clientId.ToString() },
                        { "membershipId", membershipId.ToString() }
                    }
                };

                var service = new SessionService();
                Session session = await service.CreateAsync(options);
                return session.Url;
            }
            
            return string.Empty;
        }

        public async Task ProcessWebhookAsync(string json, string signature, string provider)
        {
            // Verify signature and process event
            // If payment successful:
            // var clientId = ...; var membershipId = ...;
            // await _membershipService.ActivateMembershipAsync(clientId, membershipId);
        }
    }
}
