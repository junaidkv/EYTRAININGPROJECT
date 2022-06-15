﻿using StudentAdminApi.DataModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentAdminApi.Repository
{
    public interface IStudentRepository
    {
        Task <List<Student>> GetAllStudentDetails();
        Task<Student> GetStudentDetail( Guid studentId);
    }
}
