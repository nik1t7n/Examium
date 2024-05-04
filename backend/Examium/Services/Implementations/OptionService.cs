using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examium.DTOs;
using Examium.Models;
using Examium.Repositories.Interfaces;
using Examium.Services.Interfaces;

namespace Examium.Services.Implementations
{
    public class OptionService : IOptionService
    {
        private readonly IOptionRepository _optionRepository;

        public OptionService(IOptionRepository optionRepository)
        {
            _optionRepository = optionRepository;
        }

        public Task AddOptionToQuestionAsync(OptionDto optionDto)
        {
            return _optionRepository.AddOptionToQuestionAsync(optionDto);
        }

        public Task DeleteOptionFromQuestionAsync(int optionId)
        {
            return _optionRepository.DeleteOptionFromQuestionAsync(optionId);
        }

        public Task UpdateOption(int optionId, OptionDto optionDto)
        {
            return _optionRepository.UpdateOption(optionId, optionDto);
        }

        public Task<IEnumerable<Option>> GetAllOptionsFromQuestionAsync(int questionId)
        {
            return _optionRepository.GetAllOptionsFromQuestionAsync(questionId);
        }

        public Task<IEnumerable<Option>> GetAllOptionsAsync()
        {
            return _optionRepository.GetAllOptionsAsync();
        }
    }

}