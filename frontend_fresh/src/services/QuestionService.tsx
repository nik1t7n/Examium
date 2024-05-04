import axios from 'axios';
import { Question } from '../data/Models/Question';
import { QuestionDto } from '../data/DTOs/QuestionDto';

// Create an axios instance with CORS settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5065/api/Question',
});

// Service for handling CRUD operations related to questions
const QuestionService = {
  // Fetch all questions from the server
  getAllQuestions: async (): Promise<Question[]> => {
    const response = await axiosInstance.get<Question[]>('/GetAll');
    return response.data;
  },

  // Fetch a question by its ID from the server
  getQuestionById: async (id: number, token: string): Promise<Question | null> => {
    try {
      const response = await axiosInstance.get<Question>(`/GetById/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      // If the question is not found, return null
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  },

  // Add a new question to the server
  addQuestion: async (questionDto: QuestionDto, token: string): Promise<void> => {
    await axiosInstance.post('/Add', questionDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Update an existing question on the server
  updateQuestion: async (id: number, questionDto: QuestionDto, token: string): Promise<void> => {
    await axiosInstance.put(`/Update/${id}`, questionDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Delete a question from the server by its ID
  deleteQuestion: async (id: number, token: string): Promise<void> => {
    await axiosInstance.delete(`/Delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default QuestionService;
