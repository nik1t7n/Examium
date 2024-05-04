using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Examium.DTOs
{
    public class QuestionDto
    {
        public string? Category { get; set; }
        public int QuestionNumber { get; set; }
        public string? QuestionText { get; set; }
    }
}