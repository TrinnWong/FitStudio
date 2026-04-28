using System;

namespace FitStudio.Application.DTOs
{
    public class GymClassDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? ClassType { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreateGymClassRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? ClassType { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsActive { get; set; } = true;
    }
    
    public class UpdateGymClassRequest : CreateGymClassRequest
    {
        public Guid Id { get; set; }
    }
}
