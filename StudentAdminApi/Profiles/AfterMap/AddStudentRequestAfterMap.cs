using AutoMapper;
using StudentAdminApi.DomainModels;
using System;

namespace StudentAdminApi.Profiles.AfterMap
{
    public class AddStudentRequestAfterMap : IMappingAction<AddStudentRequest, DataModels.Student>
    {
        void IMappingAction<AddStudentRequest, DataModels.Student>.Process(AddStudentRequest source, DataModels.Student destination, ResolutionContext context)
        {
            destination.id = Guid.NewGuid();
            destination.Address = new DataModels.Address()
            {
                PhysicalAddress = source.PhysicalAddress,
                PostalAddress = source.PostalAddress,
            };
        }
    }
}
