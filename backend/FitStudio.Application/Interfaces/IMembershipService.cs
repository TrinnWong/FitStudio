using System;
using System.Threading.Tasks;

namespace FitStudio.Application.Interfaces
{
    public interface IMembershipService
    {
        Task ActivateMembershipAsync(Guid clientId, Guid membershipId);
        Task<int> GetRemainingCreditsAsync(Guid clientId);
    }
}
