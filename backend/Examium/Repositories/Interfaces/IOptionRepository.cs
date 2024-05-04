using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examium.DTOs;
using Examium.Models;

namespace Examium.Repositories.Interfaces
{
    public interface IOptionRepository
    {
        Task AddOptionToQuestionAsync(OptionDto optionDto); 
        Task UpdateOption(int optionId, OptionDto optionDto);
        Task DeleteOptionFromQuestionAsync(int optionId);
        Task<IEnumerable<Option>> GetAllOptionsFromQuestionAsync(int questionId);
        Task<IEnumerable<Option>> GetAllOptionsAsync();
    }
}