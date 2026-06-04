using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Interfaces;
using api.Data;
using api.DTOs.Call;
using api.Entities;
using api.Helpers;

namespace api.Repositories
{
    public class CallRepository: ICallRepository
    {
        private readonly ApplicationDbContext _context;

        public CallRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Call>> GetAllAsync(CallQueryObject callQuery)
        {
            var calls = _context.Calls.Include(t => t.Technician).AsQueryable();
            
            if (!string.IsNullOrWhiteSpace(callQuery.Title))
            {
                calls = calls.Where(c => c.Title.Contains(callQuery.Title));
            }

            if (!string.IsNullOrWhiteSpace(callQuery.TechnicianName))
            {
                calls = calls.Where(c => c.Technician != null && c.Technician.Name.Contains(callQuery.TechnicianName));
            }

            if (!string.IsNullOrWhiteSpace(callQuery.SortBy))
            {
                if (callQuery.SortBy.Equals("Date", StringComparison.OrdinalIgnoreCase))
                {
                    calls = callQuery.IsDescending ? calls.OrderByDescending(c => c.CreatedAt) : calls.OrderBy(c => c.CreatedAt);
                }
            }

            var skipNumber = (callQuery.PageNumber - 1) * callQuery.PageSize;

            return await calls.Skip(skipNumber).Take(callQuery.PageSize).ToListAsync();
        }

        public async Task<Call?> GetByIdAsync(int id)
        {
            return await _context.Calls.Include(c => c.Technician).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Call> CreateAsync(Call callModel)
        {
            await _context.Calls.AddAsync(callModel);
            await _context.SaveChangesAsync();
            return callModel;
        }

        public async Task<Call?> UpdateAsync(int id, UpdateCallRequestDTO callDto)
        {
            var existingCall = await _context.Calls.FirstOrDefaultAsync(c => c.Id == id);

            if (existingCall == null)
                return null;

            existingCall.Title = callDto.Title;
            existingCall.Description = callDto.Description;
            existingCall.Status = callDto.Status;
            existingCall.Priority = callDto.Priority;
            existingCall.EndedAt = callDto.EndedAt;

            await _context.SaveChangesAsync();

            return existingCall;
        }

        public async Task<Call?> DeleteAsync(int id)
        {
            var existingCall = await _context.Calls.FirstOrDefaultAsync(c => c.Id == id);

            if (existingCall == null)
                return null;

            _context.Calls.Remove(existingCall);
            await _context.SaveChangesAsync();
            return existingCall;
        }
        
    }
}