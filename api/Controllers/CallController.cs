using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using api.DTOs.Call;
using api.Interfaces;
using api.Entities;
using api.Helpers;

namespace api.Controllers
{
    [ApiController]
    [Route("api/calls")]
    public class CallController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICallRepository _callRepo;
        private readonly ITechnicianRepository _technicianRepo;

        public CallController(IMapper mapper, ICallRepository callRepo, ITechnicianRepository technicianRepo)
        {
            _mapper = mapper;
            _callRepo = callRepo;
            _technicianRepo = technicianRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] CallQueryObject callQuery)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var calls = await _callRepo.GetAllAsync(callQuery);

            var callDTOs = _mapper.Map<List<CallDTO>>(calls);

            return Ok(callDTOs);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var call = await _callRepo.GetByIdAsync(id);

            if (call == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<CallDTO>(call));
        }

        [HttpPost("{technicianId:int}")]
        public async Task<IActionResult> Create([FromRoute] int technicianId, [FromBody] CreateCallRequestDTO call)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if the technician exists
            if (!await _technicianRepo.TechnicianExists(technicianId))
            {
                return BadRequest("Technician not found");
            }

            var callModel = _mapper.Map<Call>(call);

            callModel.TechnicianId = technicianId;

            await _callRepo.CreateAsync(callModel);

            return CreatedAtAction(nameof(GetById), new { id = callModel.Id }, _mapper.Map<CallDTO>(callModel));
        }

        // Endpoint to create a call and automatically assign it to the technician with least in-progress calls
        [HttpPost("auto")]
        public async Task<IActionResult> CreateAuto([FromBody] CreateCallRequestDTO call)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Get the technician with the least in-progress calls
            var availableTechnician = await _technicianRepo.GetAvailableTechnicianAsync();

            if (availableTechnician == null)
            {
                return BadRequest("No technicians available");
            }

            var callModel = _mapper.Map<Call>(call);
            callModel.TechnicianId = availableTechnician.Id;

            await _callRepo.CreateAsync(callModel);

            return CreatedAtAction(nameof(GetById), new { id = callModel.Id }, _mapper.Map<CallDTO>(callModel));
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCallRequestDTO call)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingCall = await _callRepo.GetByIdAsync(id);
            
            if (existingCall == null)
            {
                return NotFound();
            }

            _mapper.Map(call, existingCall);
            
            var updatedCall = await _callRepo.UpdateAsync(id, call);

            return Ok(_mapper.Map<CallDTO>(updatedCall));
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingCall = await _callRepo.GetByIdAsync(id);

            if (existingCall == null)
            {
                return NotFound();
            }

            await _callRepo.DeleteAsync(id);

            return NoContent();
        }
    }
}