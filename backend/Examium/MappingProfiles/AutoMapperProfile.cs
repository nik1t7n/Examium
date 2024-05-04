using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Examium.DTOs;
using Examium.Models;

namespace Examium.MappingProfiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Question, QuestionDto>();
            CreateMap<Area, AreaDto>();
            CreateMap<Option, OptionDto>();
        }
    }
}