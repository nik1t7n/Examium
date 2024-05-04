using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examium.Database;
using Examium.Models;
using Examium.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Examium.Services.Implementations
{
    public class AdminRegistrationService : IAdminRegistrationService
    {
        private readonly DataContext _context;

        public AdminRegistrationService(DataContext context)
        {
            _context = context;
        }

        public async Task RegisterAdminAsync(string username, string password)
        {
            // Проверяем, есть ли уже администратор с таким именем
            if (await _context.Admins.AnyAsync(a => a.Username == username))
            {
                throw new InvalidOperationException("Admin with the same username already exists.");
            }

            // Хэшируем пароль
            var passwordHash = HashPassword(password);

            // Создаем нового администратора
            var admin = new Admin
            {
                Username = username,
                PasswordHash = passwordHash
            };

            // Добавляем в базу данных
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
        }

        private string HashPassword(string password)
        {
            // Хэшируем пароль с использованием BCrypt.NET
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}