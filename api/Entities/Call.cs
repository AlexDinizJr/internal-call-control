using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Entities
{
    public class Call
    {
        public int Id { get; set; }
        public int TechnicianId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? EndedAt { get; set; }
        public CallStatus Status { get; set; } = CallStatus.Pending;
        public CallPriority Priority { get; set; } = CallPriority.Medium;
        public Technician? Technician { get; set; }
    }
}