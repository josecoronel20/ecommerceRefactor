import useUserStore from "@/store/useUserStore";
import { User } from "@/types/types";
import { useEffect } from "react";
import Cookies from "js-cookie";
export const useIsLogged = () => {
  const { setUser, getUsers } = useUserStore();
  const token = Cookies.get("token");

  async function checkToken() {
    //llama a la api para obtener los usuarios
    const users = await getUsers();

    if (token) {
      const user = users.find((user: User) => user.user === token);
      if (user) {
        setUser(user);
      }
    }
  }

  useEffect(() => {
    checkToken();
  }, []);
};

export default useIsLogged;
