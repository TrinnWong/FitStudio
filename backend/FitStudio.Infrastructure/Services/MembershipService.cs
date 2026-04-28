using System;
using System.Threading.Tasks;
using FitStudio.Application.Interfaces;
using FitStudio.Domain.Entities;
using FitStudio.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FitStudio.Infrastructure.Services
{
    public class MembershipService : IMembershipService
    {
        private readonly FitStudioDbContext _context;

        public MembershipService(FitStudioDbContext context)
        {
            _context = context;
        }

        public async Task ActivateMembershipAsync(Guid clientId, Guid membershipId)
        {
            var client = await _context.Clients.FindAsync(clientId);
            var membership = await _context.Memberships.FindAsync(membershipId);

            if (client != null && membership != null)
            {
                client.Status = MembershipStatus.Active;
                client.Credits += membership.CreditAmount;
                
                await _context.SaveChangesAsync();
            }
        }

        public async Task<int> GetRemainingCreditsAsync(Guid clientId)
        {
            var client = await _context.Clients.FindAsync(clientId);
            return client?.Credits ?? 0;
        }
    }
}
