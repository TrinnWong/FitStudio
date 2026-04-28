using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FitStudio.Application.DTOs;
using FitStudio.Application.Interfaces;
using FitStudio.Domain.Entities;
using FitStudio.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FitStudio.Infrastructure.Services
{
    public class GymClassService : IGymClassService
    {
        private readonly FitStudioDbContext _context;
        private readonly IMapper _mapper;

        public GymClassService(FitStudioDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GymClassDto>> GetByStudioIdAsync(Guid studioId)
        {
            var classes = await _context.GymClasses
                .Where(c => c.StudioId == studioId)
                .ToListAsync();
            return _mapper.Map<IEnumerable<GymClassDto>>(classes);
        }

        public async Task<GymClassDto> GetByIdAsync(Guid id)
        {
            var gymClass = await _context.GymClasses.FindAsync(id);
            if (gymClass == null) throw new Exception("Class not found");
            return _mapper.Map<GymClassDto>(gymClass);
        }

        public async Task<GymClassDto> CreateAsync(Guid studioId, CreateGymClassRequest request)
        {
            var gymClass = _mapper.Map<GymClass>(request);
            gymClass.Id = Guid.NewGuid();
            gymClass.StudioId = studioId;
            
            _context.GymClasses.Add(gymClass);
            await _context.SaveChangesAsync();
            
            return _mapper.Map<GymClassDto>(gymClass);
        }

        public async Task<GymClassDto> UpdateAsync(UpdateGymClassRequest request)
        {
            var gymClass = await _context.GymClasses.FindAsync(request.Id);
            if (gymClass == null) throw new Exception("Class not found");
            
            _mapper.Map(request, gymClass);
            await _context.SaveChangesAsync();
            
            return _mapper.Map<GymClassDto>(gymClass);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var gymClass = await _context.GymClasses.FindAsync(id);
            if (gymClass == null) return false;
            
            _context.GymClasses.Remove(gymClass);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
