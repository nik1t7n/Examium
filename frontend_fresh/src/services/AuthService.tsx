import axios from 'axios';

export const login = async (username: string, password: string): Promise<string | null> => {
  try {
    const response = await axios.post('http://localhost:5065/api/Auth/login', {
      username,
      password,
    });
    const { token } = response.data;
    return token;
  } catch (error) {
    console.error('Login failed', error);
    return null;
  }
};