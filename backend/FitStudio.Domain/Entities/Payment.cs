using System;

namespace FitStudio.Domain.Entities
{
    public class Payment : BaseEntity
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "USD";
        public string Provider { get; set; } = string.Empty; // Stripe, PayPal
        public string TransactionId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty; // Pending, Completed, Failed
        
        public Guid ClientId { get; set; }
        public virtual Client Client { get; set; } = null!;
        
        public Guid? MembershipId { get; set; }
        public virtual Membership? Membership { get; set; }
    }
}
