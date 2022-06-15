
using System;

namespace StudentAdminApi.DomainModels
{
    public class Student
    {
        public Guid id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public long Mobile { get; set; }
        public string ProfileImageUrl { set; get; }
        public Guid GenderId { set; get; }
        public Gender Gender { set; get; }
        public Address Address { set; get; }
    }
}
