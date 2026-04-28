using System;

namespace FitStudio.Domain.Entities
{
    public class VerificationCode : BaseEntity
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string DataJson { get; set; } = string.Empty; // Store RegisterRequest as JSON
        public DateTime ExpiryDate { get; set; }
        public bool IsUsed { get; set; }
    }
}
