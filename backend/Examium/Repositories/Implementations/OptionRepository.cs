using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Examium.Database;
using Examium.DTOs;
using Examium.Models;
using Examium.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Examium.Repositories.Implementations
{
    public class OptionRepository : IOptionRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public OptionRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task AddOptionToQuestionAsync(OptionDto optionDto)
        {
            // Находим вопрос по его идентификатору
            var question = await _context.Questions.FindAsync(optionDto.QuestionId);

            // Проверяем, что вопрос существует
            if (question != null)
            {
                // Создаем новую опцию
                var option = new Option
                {
                    Text = optionDto.Text,
                    IsCorrect = optionDto.IsCorrect,
                    QuestionId = optionDto.QuestionId // Связываем опцию с вопросом
                };

                // Добавляем опцию в контекст данных
                _context.Options.Add(option);

                // Сохраняем изменения в базе данных
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"Question with ID {optionDto.QuestionId} not found.");
            }
        }

        public async Task DeleteOptionFromQuestionAsync(int optionId)
        {
            // Находим опцию по её идентификатору
            var option = await _context.Options.FindAsync(optionId);

            // Проверяем, что опция существует
            if (option != null)
            {
                // Удаляем опцию из контекста данных
                _context.Options.Remove(option);

                // Сохраняем изменения в базе данных
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"Option with ID {optionId} not found.");
            }
        }

        public async Task UpdateOption(int optionId, OptionDto optionDto)
        {
            // Находим опцию по её идентификатору
            var option = await _context.Options.FindAsync(optionId);

            // Проверяем, что опция существует
            if (option != null)
            {
                // Обновляем свойства опции на основе данных из DTO
                option.Text = optionDto.Text;
                option.IsCorrect = optionDto.IsCorrect;

                // Сохраняем изменения в базе данных
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"Option with ID {optionId} not found.");
            }
        }

        public async Task<IEnumerable<Option>> GetAllOptionsFromQuestionAsync(int questionId)
        {
            // Находим все опции, связанные с вопросом по его идентификатору
            var options = await _context.Options
                .Where(o => o.QuestionId == questionId)
                .ToListAsync();

            // Создаем список для хранения преобразованных объектов OptionDto
            var optionsList = new List<Option>();

            // Проходим по всем опциям и преобразуем их в OptionDto
            foreach (var option in options)
            {
                var singleOption = new Option
                {
                    Text = option.Text,
                    IsCorrect = option.IsCorrect,
                    QuestionId = option.QuestionId
                };

                // Добавляем OptionDto в список
                optionsList.Add(singleOption);
            }

            return optionsList;
        }

        public async Task<IEnumerable<Option>> GetAllOptionsAsync()
        {
            return await _context.Options.ToListAsync();
        }
    }
}