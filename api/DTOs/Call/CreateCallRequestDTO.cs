using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using api.Enums;

namespace api.DTOs.Call
{
    public class CreateCallRequestDTO
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 50 characters")]
        public string Title { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Description is required")]
        [StringLength(250, MinimumLength = 1, ErrorMessage = "Description must be between 1 and 250 characters")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Status is required")]
        [EnumDataType(typeof(CallStatus), ErrorMessage = "Invalid status")]
        public CallStatus Status { get; set; } = CallStatus.Pending;
        
        [Required(ErrorMessage = "Priority is required")]
        [EnumDataType(typeof(CallPriority), ErrorMessage = "Invalid priority")]
        public CallPriority Priority { get; set; } = CallPriority.Medium;
    }
}