using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FitStudio.Application.DTOs;

namespace FitStudio.Application.Interfaces
{
    public interface IGymClassService
    {
        Task<IEnumerable<GymClassDto>> GetByStudioIdAsync(Guid studioId);
        Task<GymClassDto> GetByIdAsync(Guid id);
        Task<GymClassDto> CreateAsync(Guid studioId, CreateGymClassRequest request);
        Task<GymClassDto> UpdateAsync(UpdateGymClassRequest request);
        Task<bool> DeleteAsync(Guid id);
    }
}
