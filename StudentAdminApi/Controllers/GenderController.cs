using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentAdminApi.DomainModels;
using StudentAdminApi.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAdminApi.Controllers
{
    [ApiController]
    public class GenderController : Controller
    {
        private readonly IStudentRepository studentRepository;
        private readonly IMapper mapper;

        public GenderController(IStudentRepository studentRepository,IMapper mapper)
        {
            this.studentRepository = studentRepository;
            this.mapper = mapper;
        }
        
        [HttpGet]
        [Route("[Controller]")]
        public async Task<IActionResult> GetAllGenderDetails()
        {
            var genders = await studentRepository.GetAllGenderDetails();
            if (genders == null || !genders.Any())
            { 
                return NotFound();
            }
            return Ok(mapper.Map<List<Gender>>(genders));
        }
    }
}
