using Examium.Models;
using Microsoft.EntityFrameworkCore;

namespace Examium.Database
{
    public class DataContext : DbContext
    {
        public DbSet<Question> Questions { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<Admin> Admins { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=ExamiumDb.sqlite3");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
