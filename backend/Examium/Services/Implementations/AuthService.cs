using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examium.Database;
using Examium.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Examium.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;

        public AuthService(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AuthenticateAsync(string username, string password)
        {
            var admin = await _context.Admins.SingleOrDefaultAsync(x => x.Username == username);
            if (admin == null) return false;

            // Сравнение хэша пароля из базы данных с введенным паролем
            return BCrypt.Net.BCrypt.Verify(password, admin.PasswordHash);
        }

        private string ComputeHash(string input)
        {
            // Генерация хэша пароля
            return BCrypt.Net.BCrypt.HashPassword(input);
        }
    }
}