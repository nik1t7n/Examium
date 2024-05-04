using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Examium.Services.Interfaces
{
    public interface IAdminRegistrationService
    {
        Task RegisterAdminAsync(string username, string password);
    }
}