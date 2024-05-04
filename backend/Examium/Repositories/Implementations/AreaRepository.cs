using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Examium.Database;
using Examium.DTOs;
using Examium.Models;
using Examium.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Examium.Repositories.Implementations
{
    public class AreaRepository : IAreaRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AreaRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddAreaAsync(AreaDto areaDto)
        {
            Area area = new Area
            {
                Category = areaDto.Category,
                Name = areaDto.Name,
                Fgp = areaDto.Fgp,
                Relief = areaDto.Relief,
                Climate = areaDto.Climate,
                InternalWaters = areaDto.InternalWaters,
                Soils = areaDto.Soils,
                Landscape = areaDto.Landscape,
                Vegetation = areaDto.Vegetation,
                Fauna = areaDto.Fauna
            };

            _context.Areas.Add(area);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteAreaAsync(int id)
        {
            var area = await _context.Areas.FindAsync(id);
            if (area != null)
            {
                _context.Areas.Remove(area);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"Area with ID {id} not found.");
            }
        }

        public async Task<IEnumerable<Area>> GetAllAreasAsync()
        {
            return await _context.Areas.ToListAsync();
        }

        public async Task<Area> GetAreaByIdAsync(int id)
        {
            return await _context.Areas.FindAsync(id);
        }

        public async Task UpdateAreaAsync(int areaId, AreaDto areaDto)
        {
            // Находим область по её идентификатору
            var area = await _context.Areas.FindAsync(areaId);

            // Проверяем, что область существует
            if (area != null)
            {
                // Обновляем свойства области на основе данных из DTO
                area.Category = areaDto.Category;
                area.Name = areaDto.Name;
                area.Fgp = areaDto.Fgp;
                area.Relief = areaDto.Relief;
                area.Climate = areaDto.Climate;
                area.InternalWaters = areaDto.InternalWaters;
                area.Soils = areaDto.Soils;
                area.Landscape = areaDto.Landscape;
                area.Vegetation = areaDto.Vegetation;
                area.Fauna = areaDto.Fauna;

                // Сохраняем изменения в базе данных
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"Area with ID {areaId} not found.");
            }
        }

    }
}
