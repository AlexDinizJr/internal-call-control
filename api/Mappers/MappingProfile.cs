using AutoMapper;
using api.DTOs.Call;
using api.DTOs.Technician;
using api.Entities;

namespace api.Mappers
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // Call Mappings
            CreateMap<Call, CallDTO>()
                .ForMember(dest => dest.TechnicianName, opt => opt.MapFrom(src => src.Technician != null ? src.Technician.Name : string.Empty));
            CreateMap<CreateCallRequestDTO, Call>();
            CreateMap<UpdateCallRequestDTO, Call>();

            // Technician Mappings
            CreateMap<Technician, TechnicianDTO>();
            CreateMap<CreateTechnicianRequestDTO, Technician>();
            CreateMap<UpdateTechnicianRequestDTO, Technician>();
        }
    }
}