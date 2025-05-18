import { Usuario } from "@/types/types";
import { create } from "zustand";

// Interfaz que define la estructura del estado y las acciones del store
interface UserStore {
  user: Usuario | null; // Usuario actual
  users: Usuario[]; // Lista de todos los usuarios
  token: string | null; // Token de autenticación
  loading: boolean; // Estado de carga
  error: string | null; // Mensaje de error si existe
  setToken: (token: string) => void; // Setea el token de autenticación
  setUser: (user: Usuario) => void; // Setea el usuario actual
  setUsers: (users: Usuario[]) => void; // Setea la lista de usuarios
  updateUser: (currentUser: Usuario) => void; // Actualiza datos del usuario
  logout: () => void; // Cierra la sesión del usuario
}

// Creación del store con Zustand
const useUserStore = create<UserStore>((set) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const token = localStorage.getItem("token");
  const user = users.find((user: Usuario) => user.user === token);

  return {
    // Estado inicial vacío
    user: user,
    users: users,
    token: token,
    loading: false,
    error: null,

    // Setea el token de autenticación
    setToken: (token: string) => {
      try {
        localStorage.setItem("token", token);
        set({ token });
      } catch (error) {
        console.error("Error al setear token:", error);
        set({ error: "Error al setear token" });
      }
    },

    // Setea el usuario actual
    setUser: (userForLogin: Usuario) => {
      try {
        const currentUsers = useUserStore.getState().users;
        const usersUpdated = currentUsers.map((user: Usuario) =>
          user.user === userForLogin.user ? userForLogin : user
        );
        localStorage.setItem("users", JSON.stringify(usersUpdated));
        set({ user: userForLogin, error: null });
      } catch (error) {
        console.error("Error al setear usuario:", error);
        set({ error: "Error al setear usuario" });
      }
    },

    // Setea la lista de usuarios
    setUsers: (users: Usuario[]) => {
      try {
        localStorage.setItem("users", JSON.stringify(users));
        set({ users, error: null });
      } catch (error) {
        console.error("Error al setear usuarios:", error);
        set({ error: "Error al setear usuarios" });
      }
    },

    // Actualiza los datos de un usuario específico
    updateUser: (currentUser: Usuario) => {
      try {
        const users = useUserStore.getState().users;
        const updatedUsers = users.map((oldUser: Usuario) =>
          oldUser.user === currentUser.user ? currentUser : oldUser
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        set({ user: currentUser, users: updatedUsers, error: null });
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        set({ error: "Error al actualizar usuario" });
      }
    },

    // Cierra la sesión del usuario
    logout: () => {
      try {
        localStorage.removeItem("token");
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
  };
});

export default useUserStore;
