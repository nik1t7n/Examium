using Examium.DTOs;
using Examium.Models;

namespace Examium.Repositories.Interfaces
{
    public interface IQuestionRepository
    {
        Task<IEnumerable<Question>> GetAllQuestionsAsync();
        Task<Question> GetQuestionByIdAsync(int id);
        Task AddQuestionAsync(QuestionDto questionDto); // Обновленный метод
        Task UpdateQuestionAsync(int questionId, QuestionDto questionDto); // Обновленный метод
        Task DeleteQuestionAsync(int id);
        
    }
}