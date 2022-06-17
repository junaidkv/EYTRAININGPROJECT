using StudentAdminApi.DataModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentAdminApi.Repository
{
    public interface IStudentRepository
    {
        Task <List<Student>> GetAllStudentDetails();
        Task<List<Gender>> GetAllGenderDetails();
        Task<Student> GetStudentDetail( Guid studentId);
        Task<Student> DeleteStudentDetail(Guid studentId);
        Task<bool> Exists(Guid studentId);
        Task<Student> UpdateStudentDetails(Guid studentId, Student request);
        Task<Student> AddStudentDetails (Student request);
    }
}
