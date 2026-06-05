using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using api.Enums;

namespace api.DTOs.Call
{
    public class UpdateCallRequestDTO
    {
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 50 characters")]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(250, MinimumLength = 1, ErrorMessage = "Description must be between 1 and 250 characters")]
        public string Description { get; set; } = string.Empty;
        
        [EnumDataType(typeof(CallStatus), ErrorMessage = "Invalid status")]
        public CallStatus Status { get; set; } = CallStatus.Pending;
        
        [EnumDataType(typeof(CallPriority), ErrorMessage = "Invalid priority")]
        public CallPriority Priority { get; set; } = CallPriority.Medium;

        [Required(ErrorMessage = "Technician is required")]
        public int TechnicianId { get; set; }
        
        public DateTime? EndedAt { get; set; } = null;
    }
}
