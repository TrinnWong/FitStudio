using AutoMapper;
using FitStudio.Application.DTOs;
using FitStudio.Domain.Entities;

namespace FitStudio.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.StudioName, opt => opt.MapFrom(src => src.Studio.Name));

            CreateMap<Client, ClientDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
            
            CreateMap<RegisterClientRequest, Client>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) // Handled by service
                .ForMember(dest => dest.EncryptedUsername, opt => opt.Ignore()); // Handled by service
        }
    }
}
