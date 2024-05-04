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
    public class QuestionRepository : IQuestionRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public QuestionRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



        public async Task AddQuestionAsync(QuestionDto questionDto)
        {
            Question question = new Question
            {
                Category = questionDto.Category,
                QuestionNumber = questionDto.QuestionNumber,
                QuestionText = questionDto.QuestionText,

            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteQuestionAsync(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question != null)
            {
                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"Question with ID {id} not found.");
            }
        }

        public async Task<IEnumerable<Question>> GetAllQuestionsAsync()
        {
            return await _context.Questions.ToListAsync();
        }

        public async Task<Question> GetQuestionByIdAsync(int id)
        {
            return await _context.Questions.FindAsync(id);
        }

        public async Task UpdateQuestionAsync(int questionId, QuestionDto questionDto)
        {
            var question = await _context.Questions.FindAsync(questionId);
            if (question != null)
            {
                // Обновление полей вопроса
                question.Category = questionDto.Category;
                question.QuestionNumber = questionDto.QuestionNumber;
                question.QuestionText = questionDto.QuestionText;

                // Сохранение изменений в базе данных
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"Question with ID {questionId} not found.");
            }
        }

    }
}
