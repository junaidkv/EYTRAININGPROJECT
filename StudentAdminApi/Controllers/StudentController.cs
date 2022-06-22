using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentAdminApi.DomainModels;
using StudentAdminApi.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace StudentAdminApi.Controllers
{
    [ApiController]
    public class StudentController : Controller
    {
        public IStudentRepository studentRepository;
        private readonly IImageRepository imageRepository;

        public IMapper Mapper { get; }
        public StudentController(IStudentRepository studentRepository, IMapper mapper, IImageRepository imageRepository)
        {
            this.studentRepository = studentRepository;
            Mapper = mapper;
            this.imageRepository = imageRepository;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllStudent()
        {
            var students = await studentRepository.GetAllStudentDetails();
            return Ok(Mapper.Map<List<Student>>(students));
        }

        [HttpGet]
        [Route("[controller]/{studentId:guid}"), ActionName("GetStudentDetails")]
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

        [HttpPost]
        [Route("[controller]")]
        public async Task<IActionResult> AddStudentDetails([FromBody] AddStudentRequest request)
        {
            var result = await studentRepository.AddStudentDetails(Mapper.Map<DataModels.Student>(request));
            return CreatedAtAction(nameof(GetStudentDetails), new { studentId = result.id },
                Mapper.Map<DomainModels.Student>(result));
        }

        [HttpPost]
        [Route("[controller]/{studentId:guid}/upload-image")]
        public async Task<IActionResult> UploadImage([FromRoute] Guid studentId, IFormFile profileImage)
        {

            var validExtentions = new List<string> { ".jpeg", ".png" , ".gif" , ".jpg"};
            if (profileImage != null && profileImage.Length>0)
            {
                var extention = Path.GetExtension(profileImage.FileName).ToLower();

                if (validExtentions.Contains(extention))
                {
                    // check if student exists

                    if (await studentRepository.Exists(studentId))
                    {

                        //converting to new file name using guid and fetching extention and adding to new guid
                        var fileName = Guid.NewGuid() + Path.GetExtension(profileImage.FileName);

                        // upload image to local storage
                        var fileImagePath = await imageRepository.Upload(profileImage, fileName);

                        // update the profile image path in database
                        if (await studentRepository.UpdateProfileImage(studentId, fileImagePath))
                        {
                            return Ok(fileImagePath);
                        }

                        return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading image");

                    }
                }
                return BadRequest("Invalid Image Format");
                
            }
            return NotFound();
        }
    }
}

