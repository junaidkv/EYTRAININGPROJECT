﻿using AutoMapper;
using DataModel= StudentAdminApi.DataModels;
using StudentAdminApi.DomainModels;
using StudentAdminApi.Profiles.AfterMap;

namespace StudentAdminApi.Profiles
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<DataModel.Student,Student>().ReverseMap();
            CreateMap<DataModel.Gender,Gender>().ReverseMap();
            CreateMap<DataModel.Address,Address>().ReverseMap();
            CreateMap<UpdateStudentRequest, DataModel.Student>()
                .AfterMap<UpdateStudentRequestAfterMap>();
            CreateMap<AddStudentRequest, DataModel.Student>()
                .AfterMap<AddStudentRequestAfterMap>();
        }
    }
}
