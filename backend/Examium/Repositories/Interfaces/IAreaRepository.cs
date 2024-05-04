using Examium.DTOs;
using Examium.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Examium.Repositories.Interfaces
{
    public interface IAreaRepository
    {
        Task<IEnumerable<Area>> GetAllAreasAsync();
        Task<Area> GetAreaByIdAsync(int id);
        Task AddAreaAsync(AreaDto areaDto); // Обновленный метод
        Task UpdateAreaAsync(int areaId, AreaDto areaDto); // Обновленный метод
        Task DeleteAreaAsync(int id);
    }
}
