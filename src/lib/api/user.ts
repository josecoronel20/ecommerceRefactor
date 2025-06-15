import { API_AUTH_URL, API_USER_URL } from "@/lib/utils/constants";
import { User } from "@/types/auth";
import Cookies from "js-cookie";

// Elimina un usuario
export const userApi = {
  deleteUser: async (id: number) => {
    try {
      const response = await fetch(`${API_USER_URL}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'credentials': 'include',
        },
      });

      return response;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  },

  // Actualiza los datos de un usuario específico
  updateUser: async (currentUser: User) => {
    try {
      const idPath = currentUser.id.toString();
      const response = await fetch(`${API_USER_URL}/${idPath}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar usuario');
      }

      return response.json();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  },

  getMe: async () => {
    try {
      const response = await fetch(`${API_USER_URL}/me`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'credentials': 'include',
        }
      });
      const data = await response.json();
      console.log(data);

      return data.user;
    } catch (error) {
      console.error('Error al obtener usuario logueado:', error);
      throw error;
    }
  }
}