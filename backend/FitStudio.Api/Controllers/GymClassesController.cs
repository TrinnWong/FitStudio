using FitStudio.Application.DTOs;
using FitStudio.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FitStudio.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    // [Authorize] // Temporarily disabled for easier testing, should be enabled later
    public class GymClassesController : ControllerBase
    {
        private readonly IGymClassService _gymClassService;

        public GymClassesController(IGymClassService gymClassService)
        {
            _gymClassService = gymClassService;
        }

        [HttpGet("studio/{studioId}")]
        public async Task<ActionResult<IEnumerable<GymClassDto>>> GetByStudio(Guid studioId)
        {
            var result = await _gymClassService.GetByStudioIdAsync(studioId);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GymClassDto>> GetById(Guid id)
        {
            try {
                var result = await _gymClassService.GetByIdAsync(id);
                return Ok(result);
            } catch (Exception ex) {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost("studio/{studioId}")]
        public async Task<ActionResult<GymClassDto>> Create(Guid studioId, [FromBody] CreateGymClassRequest request)
        {
            var result = await _gymClassService.CreateAsync(studioId, request);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut]
        public async Task<ActionResult<GymClassDto>> Update([FromBody] UpdateGymClassRequest request)
        {
            try {
                var result = await _gymClassService.UpdateAsync(request);
                return Ok(result);
            } catch (Exception ex) {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _gymClassService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
