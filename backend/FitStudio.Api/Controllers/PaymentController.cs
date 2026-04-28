using System;
using System.Threading.Tasks;
using FitStudio.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitStudio.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost("checkout")]
        public async Task<IActionResult> CreateCheckout([FromQuery] Guid membershipId, [FromQuery] string provider = "stripe")
        {
            // Get ClientId from JWT Claims
            var clientId = Guid.Parse(User.FindFirst("id")?.Value ?? Guid.Empty.ToString());
            
            var url = await _paymentService.CreateCheckoutSessionAsync(clientId, membershipId, provider);
            return Ok(new { checkoutUrl = url });
        }

        [HttpPost("webhook/stripe")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new System.IO.StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var signature = Request.Headers["Stripe-Signature"];

            await _paymentService.ProcessWebhookAsync(json, signature!, "stripe");
            return Ok();
        }
    }
}
