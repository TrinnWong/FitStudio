using System;

namespace FitStudio.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // SuperAdmin, StudioOwner
        
        public Guid StudioId { get; set; }
        public virtual Studio Studio { get; set; } = null!;
    }
}
