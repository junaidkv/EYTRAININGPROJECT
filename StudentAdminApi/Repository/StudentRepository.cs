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
    }
}
