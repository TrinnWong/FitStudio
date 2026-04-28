using System.Collections.Generic;

namespace FitStudio.Domain.Entities
{
    public class Studio : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty; // For multi-tenancy URL
        public string StripeAccountId { get; set; } = string.Empty;
        
        public virtual ICollection<User> Users { get; set; } = new List<User>();
        public virtual ICollection<Client> Clients { get; set; } = new List<Client>();
        public virtual ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
        public virtual ICollection<Membership> Memberships { get; set; } = new List<Membership>();
        public virtual ICollection<GymClass> GymClasses { get; set; } = new List<GymClass>();
    }
}
