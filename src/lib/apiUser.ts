import {
  LoginUserResponse,
  User,
  UserLogin,
  UserRegister,
} from "@/types/types";
import Cookies from "js-cookie";

// Inicia sesión
export const login = async (user: UserLogin) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    //obtiene el usuario y el token
    const data: LoginUserResponse = await response.json();
    //guarda el token en el cookie
    Cookies.set("token", data.token, { expires: 1 });

    return data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

//cerrar sesión
export const logout = async () => {
  Cookies.remove("token");
  window.location.href = "/login";
};

// Registra un usuario
export const register = async (user: UserRegister) => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return response;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// Elimina un usuario
export const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`/api/auth/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    Cookies.remove("token");
    return response;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

// Actualiza los datos de un usuario específico
export const updateUser = async (currentUser: User) => {
  //actualiza el usuario en la db
  try {
    const idPath = currentUser.id.toString();
    const response = await fetch(`/api/auth/users/${idPath}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser),
    });

    return response;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};
