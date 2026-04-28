using FitStudio.Application.Interfaces;
using FitStudio.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FitStudio.Infrastructure.Persistence
{
    public static class DbInitializer
    {
        public static async Task SeedAsync(FitStudioDbContext context, IAuthService authService)
        {
            context.Database.EnsureCreated();

            if (context.Studios.Any()) return;

            var studio = new Studio
            {
                Name = "Default Jump Studio",
                Slug = "default-jump",
                CreatedAt = DateTime.UtcNow
            };

            context.Studios.Add(studio);
            await context.SaveChangesAsync();

            var admin = new User
            {
                Email = "admin@fitstudio.com",
                Role = "SuperAdmin",
                PasswordHash = authService.HashPassword("Admin123!"),
                StudioId = studio.Id,
                CreatedAt = DateTime.UtcNow
            };

            context.Users.Add(admin);

            var owner = new User
            {
                Email = "owner@fitstudio.com",
                Role = "StudioOwner",
                PasswordHash = authService.HashPassword("Owner123!"),
                StudioId = studio.Id,
                CreatedAt = DateTime.UtcNow
            };

            context.Users.Add(owner);
            await context.SaveChangesAsync();
        }
    }
}
