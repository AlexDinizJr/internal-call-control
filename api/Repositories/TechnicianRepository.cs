using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Interfaces;
using api.Data;
using api.DTOs.Technician;
using api.Entities;
using api.Enums;

namespace api.Repositories
{
    public class TechnicianRepository: ITechnicianRepository
    {
        private readonly ApplicationDbContext _context;

        public TechnicianRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Technician>> GetAllAsync()
        {
            return await _context.Technicians.Include(t => t.Calls).ToListAsync();
        }

        public async Task<Technician?> GetByIdAsync(int id)
        {
            return await _context.Technicians.Include(t => t.Calls).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<Technician> CreateAsync(Technician technicianModel)
        {
            await _context.Technicians.AddAsync(technicianModel);
            await _context.SaveChangesAsync();
            return technicianModel;
        }

        public async Task<Technician?> UpdateAsync(int id, UpdateTechnicianRequestDTO technicianDto)
        {
            var existingTechnician = await _context.Technicians.FirstOrDefaultAsync(t => t.Id == id);

            if (existingTechnician == null) return null;

            existingTechnician.Name = technicianDto.Name;

            await _context.SaveChangesAsync();
            return existingTechnician;
        }

        public async Task<Technician?> DeleteAsync(int id)
        {
            var existingTechnician = await _context.Technicians.FirstOrDefaultAsync(t => t.Id == id);
            if (existingTechnician == null) return null;

            _context.Technicians.Remove(existingTechnician);
            await _context.SaveChangesAsync();
            return existingTechnician;
        
        }
        
        public Task<bool> TechnicianExists(int id)
        {
            return _context.Technicians.AnyAsync(t => t.Id == id);
        }

        public async Task<Technician?> GetAvailableTechnicianAsync()
        {
            // Returns the technician with the least number of open calls.
            return await _context.Technicians
                .Include(t => t.Calls)
                .OrderBy(t => t.Calls.Count(c => c.Status == CallStatus.Pending || c.Status == CallStatus.InProgress))
                .FirstOrDefaultAsync();
        }
    }
}
