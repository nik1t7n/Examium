import axios from 'axios';
import { Area } from '../data/Models/Area';
import { AreaDto } from '../data/DTOs/AreaDto';

// Создайте экземпляр axios с настройками CORS
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5065/api/Area',
});


const AreaService = {
  getAllAreas: async (): Promise<Area[]> => {
    const response = await axiosInstance.get<Area[]>('/GetAll');
    return response.data;
  },

  addArea: async (areaDto: AreaDto, token: string): Promise<void> => {
    await axiosInstance.post('/Add', areaDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateArea: async (id: number, areaDto: AreaDto, token: string): Promise<void> => {
    await axiosInstance.put(`/Update/${id}`, areaDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteArea: async (id: number, token: string): Promise<void> => {
    await axiosInstance.delete(`/Delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getAreaById: async (id: number, token: string): Promise<Area | null> => {
    try {
      const response = await axiosInstance.get<Area>(`/GetById/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  },
};

export default AreaService;
