using FitStudio.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FitStudio.Infrastructure.Persistence
{
    public class FitStudioDbContext : DbContext
    {
        public FitStudioDbContext(DbContextOptions<FitStudioDbContext> options) : base(options) { }

        public DbSet<Studio> Studios { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Membership> Memberships { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<VerificationCode> VerificationCodes { get; set; }
        public DbSet<GymClass> GymClasses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<GymClass>()
                .HasOne(gc => gc.Studio)
                .WithMany(s => s.GymClasses)
                .HasForeignKey(gc => gc.StudioId);

            modelBuilder.Entity<Schedule>()
                .HasOne(s => s.GymClass)
                .WithMany(gc => gc.Schedules)
                .HasForeignKey(s => s.GymClassId)
                .OnDelete(DeleteBehavior.Restrict);

            // Multi-tenancy filter (Global Query Filter)
            // This would normally be implemented via a service that provides the current StudioId
            // but for now we define the relationships.

            modelBuilder.Entity<Studio>()
                .HasIndex(s => s.Slug);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Studio)
                .WithMany(s => s.Users)
                .HasForeignKey(u => u.StudioId);

            modelBuilder.Entity<Client>()
                .HasOne(c => c.Studio)
                .WithMany(s => s.Clients)
                .HasForeignKey(c => c.StudioId);

            modelBuilder.Entity<Schedule>()
                .HasOne(s => s.Studio)
                .WithMany(st => st.Schedules)
                .HasForeignKey(s => s.StudioId);

            modelBuilder.Entity<Membership>()
                .HasOne(m => m.Studio)
                .WithMany(s => s.Memberships)
                .HasForeignKey(m => m.StudioId);

            modelBuilder.Entity<Membership>()
                .Property(m => m.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Schedule)
                .WithMany(s => s.Bookings)
                .HasForeignKey(b => b.ScheduleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Seed initial roles or data could go here or in a separate Initializer
        }
    }
}
