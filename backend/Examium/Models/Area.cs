

using System.ComponentModel.DataAnnotations;

namespace Examium.Models
{
    public class Area
    {
        [Key]
        public int Id { get; set; }
        public string? Category { get; set; }
        public string? Name { get; set; }
        public string? Fgp { get; set; }
        public string? Relief { get; set; }
        public string? Climate { get; set; }
        public string? InternalWaters { get; set; }
        public string? Soils { get; set; }
        public string? Landscape { get; set; }
        public string? Vegetation { get; set; }
        public string? Fauna { get; set; }
    }
}