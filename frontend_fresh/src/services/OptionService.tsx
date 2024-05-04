import axios from 'axios';
import { OptionDto } from '../data/DTOs/OptionDto';
import { Option } from '../data/Models/Option';

// Создайте экземпляр axios с настройками CORS
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5065/api/Option',
});


const OptionService = {
  getAllOptions: async (): Promise<Option[]> => {
    const response = await axiosInstance.get<Option[]>('/GetAllOptions');
    return response.data;
  },

  addOption: async (optionDto: OptionDto, token: string): Promise<void> => {
    await axiosInstance.post('/Add', optionDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateOption: async (id: number, optionDto: OptionDto, token: string): Promise<void> => {
    await axiosInstance.put(`/Update/${id}`, optionDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteOption: async (id: number, token: string): Promise<void> => {
    await axiosInstance.delete(`/Delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getAllOptionsFromQuestions: async (questionId: number): Promise<Option[]> => {
    const response = await axiosInstance.get<Option[]>(`/GetAllOptionsFromQuestions/${questionId}`, {
    });
    return response.data;
  },
};

export default OptionService;
