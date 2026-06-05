using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.DTOs.Call
{
    public class CallDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? EndedAt { get; set; } = null;
        public CallStatus Status { get; set; } = CallStatus.Pending;
        public CallPriority Priority { get; set; } = CallPriority.Medium;
        public int TechnicianId { get; set; }
        public string TechnicianName { get; set; } = string.Empty;
    }
}
