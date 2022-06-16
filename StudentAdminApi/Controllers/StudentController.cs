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
        public StudentController(IStudentRepository studentRepository, IMapper mapper)
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

        [HttpDelete]
        [Route("[controller]/{studentId:guid}")]
        public async Task<IActionResult> DeleteStudentDetails([FromRoute] Guid studentId)
        {
            if (await this.studentRepository.Exists(studentId))
            {
                var student = await studentRepository.DeleteStudentDetail(studentId);

                return Ok(Mapper.Map<Student>(student));
            }
            return NotFound();
        }

        [HttpPut]
        [Route("[controller]/{studentId:guid}")]
        public async Task<IActionResult> UpdateStudentDetails([FromRoute] Guid studentId, [FromBody] UpdateStudentRequest request)
        {
            if (await studentRepository.Exists(studentId))
            {
                var updatedStudent = await studentRepository.UpdateStudentDetails(studentId, Mapper.Map<DataModels.Student>(request));

                if (updatedStudent != null)
                {
                    return Ok(Mapper.Map<Student>(updatedStudent));
                }
            }
            return NotFound();
        }
    }
}
