using System;

namespace FitStudio.Domain.Entities
{
    public class Membership : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int CreditAmount { get; set; }
        public int DurationDays { get; set; }
        
        public Guid StudioId { get; set; }
        public virtual Studio Studio { get; set; } = null!;
    }
}
