using System.Collections.Generic;
using System.Threading.Tasks;
using Examium.DTOs;
using Examium.Models;

namespace Examium.Services.Interfaces
{
    public interface IAreaService
    {
        Task<IEnumerable<Area>> GetAllAreasAsync();
        Task<Area> GetAreaByIdAsync(int id);
        Task AddAreaAsync(AreaDto areaDto);
        Task UpdateAreaAsync(int areaId, AreaDto areaDto);
        Task DeleteAreaAsync(int id);
    }
}
