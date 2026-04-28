using System;
using System.Collections.Generic;

namespace FitStudio.Domain.Entities
{
    public class Client : BaseEntity
    {
        // Encrypted field as requested
        public string EncryptedUsername { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty; // For notifications
        
        public int Credits { get; set; } = 0;
        public MembershipStatus Status { get; set; } = MembershipStatus.Inactive;
        
        public Guid StudioId { get; set; }
        public virtual Studio Studio { get; set; } = null!;
        
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }

    public enum MembershipStatus
    {
        Inactive,
        Active,
        Expired,
        Cancelled
    }
}
