using System.Collections.Generic;
using System.Threading.Tasks;
using Examium.DTOs;
using Examium.Models;

namespace Examium.Services.Interfaces
{
    public interface IQuestionService
    {
        Task<IEnumerable<Question>> GetAllQuestionsAsync();
        Task<Question> GetQuestionByIdAsync(int id);
        Task AddQuestionAsync(QuestionDto questionDto);
        Task UpdateQuestionAsync(int questionId, QuestionDto questionDto);
        Task DeleteQuestionAsync(int id);
    }
}
