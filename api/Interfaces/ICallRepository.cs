using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Call;
using api.Entities;
using api.Helpers;

namespace api.Interfaces
{
    public interface ICallRepository
    {
        public Task<List<Call>> GetAllAsync(CallQueryObject callQuery);
        public Task<Call?> GetByIdAsync(int id);
        public Task<Call> CreateAsync(Call callModel);
        public Task<Call?> UpdateAsync(int id, UpdateCallRequestDTO callDto);
        public Task<Call?> DeleteAsync(int id);
    }
}