using Microsoft.EntityFrameworkCore;
using StudentAdminApi.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAdminApi.Repository
{
    public class StudentRepository : IStudentRepository
    {
        private readonly StudentAdminDataContext context;
        public StudentRepository(StudentAdminDataContext context)
        {
            this.context = context;
        }
        public async Task<List<Student>> GetAllStudentDetails()
        {
            return await context.Students.Include(nameof(Gender)).Include(nameof(Address)).ToListAsync();
        }

        public async Task<Student> GetStudentDetail(Guid studentId)
        {
            return await context.Students.Include(nameof(Gender)).Include(nameof(Address)).FirstOrDefaultAsync(student=> student.id == studentId);
        }

        public async Task<List<Gender>> GetAllGenderDetails()
        {
            return await context.Genders.ToListAsync();
        }

        public async Task<bool> Exists(Guid studentId)
        {
            return await context.Students.AnyAsync(x => x.id == studentId);
        }

        public async Task<Student> UpdateStudentDetails(Guid studentId, Student request)
        {
            var existingStudent = await GetStudentDetail(studentId);
            if (existingStudent != null)
            { 
                existingStudent.FirstName = request.FirstName;
                existingStudent.LastName = request.LastName;
                existingStudent.GenderId = request.GenderId;
                existingStudent.Address.PostalAddress = request.Address.PostalAddress;
                existingStudent.Address.PhysicalAddress = request.Address.PhysicalAddress;
                existingStudent.DateOfBirth= request.DateOfBirth;
                existingStudent.Email= request.Email;
                
                await context.SaveChangesAsync();
                return existingStudent;
            }

            return null;
        }
    }
}
