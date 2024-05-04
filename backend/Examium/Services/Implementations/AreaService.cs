using System.Collections.Generic;
using System.Threading.Tasks;
using Examium.DTOs;
using Examium.Models;
using Examium.Repositories.Interfaces;
using Examium.Services.Interfaces;

namespace Examium.Services.Implementations
{
    public class AreaService : IAreaService
    {
        private readonly IAreaRepository _areaRepository;

        public AreaService(IAreaRepository areaRepository)
        {
            _areaRepository = areaRepository;
        }

        public async Task<IEnumerable<Area>> GetAllAreasAsync()
        {
            return await _areaRepository.GetAllAreasAsync();
        }

        public async Task<Area> GetAreaByIdAsync(int id)
        {
            return await _areaRepository.GetAreaByIdAsync(id);
        }

        public async Task AddAreaAsync(AreaDto areaDto)
        {
            await _areaRepository.AddAreaAsync(areaDto);
        }

        public async Task UpdateAreaAsync(int areaId, AreaDto areaDto)
        {
            await _areaRepository.UpdateAreaAsync(areaId, areaDto);
        }

        public async Task DeleteAreaAsync(int id)
        {
            await _areaRepository.DeleteAreaAsync(id);
        }
    }
}
