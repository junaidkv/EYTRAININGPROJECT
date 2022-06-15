using Microsoft.EntityFrameworkCore;

namespace StudentAdminApi.DataModels
{
    public class StudentAdminDataContext : DbContext
    {
        public StudentAdminDataContext(DbContextOptions<StudentAdminDataContext> options) : base(options)
        {}
        public DbSet<Student> Students { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Gender> Genders { get; set; }
    }
}
