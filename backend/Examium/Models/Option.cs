using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Examium.Models
{
    public class Option
    {
        [Key]
        public int Id { get; set; }
        public string? Text { get; set; }
        public bool IsCorrect { get; set; }

        // Внешний ключ для связи с вопросом
        public int QuestionId { get; set; }
    }
}
