import { LoginUserResponse, User, UserLogin, UserRegister } from '@/types/auth';
import Cookies from 'js-cookie';
import { API_AUTH_URL } from '@/lib/utils/constants';

export const authApi = {
  // Inicia sesión
  login: async (user: UserLogin) => {
    try {
      const response = await fetch(`${API_AUTH_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      //obtiene el usuario 
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  },

  //cerrar sesión
  logout: async () => {
    const response = await fetch(`${API_AUTH_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      window.location.replace('/login');
    }
  },

  // Registra un usuario
  register: async (user: UserRegister) => {
    try {
      const response = await fetch(`${API_AUTH_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      return response;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  },

  // Elimina un usuario
  deleteUser: async (id: number) => {
    try {
      const response = await fetch(`${API_AUTH_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Cookies.remove('token');
      return response;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  },

  // Actualiza los datos de un usuario específico
  updateUser: async (currentUser: User) => {
    //actualiza el usuario en la db
    try {
      const idPath = currentUser.id.toString();
      const response = await fetch(`${API_AUTH_URL}/users/${idPath}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      });

      return response;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  },

  getUserLogged: async () => {
    try {
      const response = await fetch(`/api/auth/me`);
      const data = await response.json();

      return data.user;
    } catch (error) {
      console.error('Error al obtener usuario logueado:', error);
      throw error;
    }
  },
};
