using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentAdminApi.DomainModels;
using StudentAdminApi.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentAdminApi.Controllers
{
    public class StudentController : Controller
    {
        public IStudentRepository studentRepository;
        public IMapper Mapper { get; }
        public StudentController(IStudentRepository studentRepository,IMapper mapper)
        {
            this.studentRepository = studentRepository;
            Mapper = mapper;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllStudent()
        {
            var students = await studentRepository.GetAllStudentDetails();
            return Ok(Mapper.Map<List<Student>>(students));
        }

        [HttpGet]
        [Route("[controller]/{studentId:guid}")]
        public async Task<IActionResult> GetStudentDetails([FromRoute] Guid studentId)
        {
            var students = await studentRepository.GetStudentDetail(studentId);

            if (students == null)
            {
                return NotFound();
            }
            else 
            {
                return Ok(Mapper.Map<Student>(students));
            }
        }
    }
}
