using System;
using System.Collections.Generic;

namespace FitStudio.Domain.Entities
{
    public class GymClass : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? ClassType { get; set; } // Grupal, 1-1, etc.
        public string? ImageUrl { get; set; }
        public bool IsActive { get; set; } = true;
        
        public Guid StudioId { get; set; }
        public virtual Studio Studio { get; set; } = null!;
        
        public virtual ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
    }
}
