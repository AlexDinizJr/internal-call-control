using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Technician;
using api.Entities;

namespace api.Interfaces
{
    public interface ITechnicianRepository
    {
        public Task<List<Technician>> GetAllAsync();
        public Task<Technician?> GetByIdAsync(int id);
        public Task<Technician> CreateAsync(Technician technicianModel);
        public Task<Technician?> UpdateAsync(int id, UpdateTechnicianRequestDTO technicianDto);
        public Task<Technician?> DeleteAsync(int id);
        Task<bool> TechnicianExists(int id);
        Task<Technician?> GetAvailableTechnicianAsync();
    }
}