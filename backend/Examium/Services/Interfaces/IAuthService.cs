using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Examium.Services.Interfaces
{
    public interface IAuthService
    {
        Task<bool> AuthenticateAsync(string username, string password);
    }
}