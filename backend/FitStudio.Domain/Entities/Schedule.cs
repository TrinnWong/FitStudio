using System;
using System.Collections.Generic;

namespace FitStudio.Domain.Entities
{
    public class Schedule : BaseEntity
    {
        public Guid GymClassId { get; set; }
        public virtual GymClass GymClass { get; set; } = null!;
        
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Capacity { get; set; }
        public int AvailableSlots { get; set; }
        
        public Guid StudioId { get; set; }
        public virtual Studio Studio { get; set; } = null!;
        
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
