import { LoginUserResponse, User, UserLogin, UserRegister } from '@/types/auth';
import Cookies from 'js-cookie';
import { API_AUTH_URL } from '@/lib/utils/constants';

export const authApi = {
  // Inicia sesión
  login: async (userData: UserLogin) => {
    try {
      const response = await fetch(`${API_AUTH_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Error en el login');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  },

  //cerrar sesión
  logout: async () => {
    try {
      const response = await fetch(`${API_AUTH_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error en el logout');
      }

      return response.json();
    } catch (error) {
      console.error('Error en el logout:', error);
      throw error;
    }
  },

  // Registra un usuario
  register: async (user: UserRegister) => {
    try {
      const response = await fetch(`${API_AUTH_URL}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar usuario');
      }

      return response;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  },
};
