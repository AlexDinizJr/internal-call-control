using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using api.DTOs.Technician;
using api.Interfaces;
using api.Entities;

namespace api.Controllers
{
    [ApiController]
    [Route("api/technicians")]
    public class TechnicianController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITechnicianRepository _technicianRepo;

        public TechnicianController(IMapper mapper, ITechnicianRepository technicianRepo)
        {
            _mapper = mapper;
            _technicianRepo = technicianRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var technicians = await _technicianRepo.GetAllAsync();

            var technicianDTOs = _mapper.Map<List<TechnicianDTO>>(technicians);

            return Ok(technicianDTOs);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var technician = await _technicianRepo.GetByIdAsync(id);

            if (technician == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<TechnicianDTO>(technician));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTechnicianRequestDTO technician)
        {
            var technicianModel = _mapper.Map<Technician>(technician);

            await _technicianRepo.CreateAsync(technicianModel);

            return CreatedAtAction(nameof(GetById), new { id = technicianModel.Id }, _mapper.Map<TechnicianDTO>(technicianModel));
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTechnicianRequestDTO technician)
        {
            var updatedTechnician =
                await _technicianRepo.UpdateAsync(id, technician);

            if (updatedTechnician == null)
                return NotFound();

            return Ok(_mapper.Map<TechnicianDTO>(updatedTechnician));
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var deletedTechnician = await _technicianRepo.DeleteAsync(id);

            if (deletedTechnician == null)
                return NotFound();

            return NoContent();
        }
    }
}