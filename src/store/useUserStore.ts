import {
  UserLogin,
  UserRegister,
  User,
  LoginUserResponse,
} from "@/types/types";
import Cookies from "js-cookie";
import { create } from "zustand";

// Interfaz que define la estructura del estado y las acciones del store
interface UserStore {
  user: User | null; // Usuario actual
  users: User[]; // Lista de todos los usuarios
  token: string | null; // Token de autenticación
  loading: boolean; // Estado de carga
  error: string | null; // Mensaje de error si existe
  setUser: (user: User) => void; // Setea el usuario actual
  setUsers: (users: User[]) => void; // Setea la lista de usuarios
  updateUser: (currentUser: User) => void; // Actualiza datos del usuario
  logout: () => void; // Cierra la sesión del usuario
  login: (user: UserLogin) => Promise<Response>; // Inicia sesión
  register: (user: UserRegister) => Promise<Response>; // Registra un usuario
  getUsers: () => Promise<User[]>; // Obtiene la lista de usuarios
  deleteUser: (id: number) => Promise<Response>; // Elimina un usuario
}

// Creación del store con Zustand
const useUserStore = create<UserStore>((set) => {
  return {
    // Estado inicial vacío
    user: null,
    users: [],
    token: null,
    loading: false,
    error: null,

    // Setea el usuario actual
    setUser: (userForLogin: User) => {
      try {
        set({ user: userForLogin, error: null });
      } catch (error) {
        console.error("Error al setear usuario:", error);
        set({ error: "Error al setear usuario" });
      }
    },

    // Setea la lista de usuarios
    setUsers: (users: User[]) => {
      try {
        set({ users, error: null });
      } catch (error) {
        console.error("Error al setear usuarios:", error);
        set({ error: "Error al setear usuarios" });
      }
    },

    // Cierra la sesión del usuario
    logout: () => {
      try {
        Cookies.remove("token");
        set({
          user: null,
          token: null,
          error: null,
        });
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        set({ error: "Error al cerrar sesión" });
      }
    },

    // Actualiza los datos de un usuario específico
    updateUser: async (currentUser: User) => {
      //actualiza el usuario en la db
      try {
        const idPath = currentUser.id.toString();
        const response = await fetch(`/api/auth/users/${idPath}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(currentUser),
        });
        //actualiza el usuario y usuarios en el store
        const users = useUserStore.getState().users;
        const updatedUsers = users.map((oldUser: User) =>
          oldUser.id === currentUser.id ? currentUser : oldUser
        );

        set({ user: currentUser, users: updatedUsers, error: null });
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        set({ error: "Error al actualizar usuario" });
      }
    },

    // Inicia sesión
    login: async (user: UserLogin) => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(user),
        });

        const data: LoginUserResponse = await response.json();
        Cookies.set("token", data.token, { expires: 1 });

        set({
          user: data.user,
          token: data.token,
        });

        return response;
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
      }
    },

    // Registra un usuario
    register: async (user: UserRegister) => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error("Error al registrar usuario");
        }

        return response;
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
      }
    },

    getUsers: async () => {
      try {
        const response = await fetch("/api/auth/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }

        return response.json();
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
      }
    },

    deleteUser: async (id: number) => {
      try {
        const response = await fetch(`/api/auth/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        Cookies.remove("token");
        return response;
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
      }
    },
  };
});

export default useUserStore;
