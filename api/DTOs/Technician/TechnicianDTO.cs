using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Call;

namespace api.DTOs.Technician
{
    public class TechnicianDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<CallDTO> Calls { get; set; } = new List<CallDTO>();
    }
}