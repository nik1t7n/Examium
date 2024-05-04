

using System.ComponentModel.DataAnnotations;

namespace Examium.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }
        public string? Category { get; set; }
        public int QuestionNumber { get; set; }
        public string? QuestionText { get; set; }
    }
}