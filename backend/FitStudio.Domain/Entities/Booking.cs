using System;

namespace FitStudio.Domain.Entities
{
    public class Booking : BaseEntity
    {
        public Guid ClientId { get; set; }
        public virtual Client Client { get; set; } = null!;
        
        public Guid ScheduleId { get; set; }
        public virtual Schedule Schedule { get; set; } = null!;
        
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
        public bool IsCancelled { get; set; }
        public bool Attended { get; set; }
    }
}
