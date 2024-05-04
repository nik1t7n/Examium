using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Examium.DTOs
{
    public class OptionDto
    {
        public string? Text { get; set;}
        public bool IsCorrect { get; set;}
        public int QuestionId { get; set; }
    }
}