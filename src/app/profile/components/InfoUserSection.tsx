import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import React from "react";
import useUserStore from "@/store/useUserStore";
import NicknameSection from "./NickNameSection";
import Cookies from "js-cookie";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";

const InfoUserSection = () => {
  const { user, deleteUser } = useUserStore();

  if (!user) {
    return <div>No hay usuario</div>;
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    //solución temporal
    const image = "avatar-" + user?.user + ".png";

    localStorage.setItem("image", image);
    console.log(localStorage.getItem("image"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUser(user.id);
      handleLogout();
    } catch (error) {
      console.error("Error al eliminar cuenta:", error);
    }
  };

  return (
    <section className="flex flex-col gap-4 justify-center items-center p-4 border border-gray-200 rounded-lg w-full">
      <h1 className="text-2xl font-bold">Mi perfil</h1>
      <h2 className="text-lg font-bold">Perfil de usuario</h2>
      <Button variant="outline" onClick={() => console.log(Cookies.get("token"))}>
        Checkear cookies
      </Button>

      <div className="flex gap-4 justify-center items-center w-full">
        <div className="flex flex-col gap-4 items-center">
          <Avatar className="w-32 h-32">
            {user?.image && <AvatarImage src={user.image} />}
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>

          <Button className="cursor-pointer" variant="outline">
            <label htmlFor="file-input" className="cursor-pointer">
              Cambiar imagen
            </label>
            <input
              id="file-input"
              type="file"
              className="hidden"
              onChange={(e) => handleChangeImage(e)}
            />
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <NicknameSection />

          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">nombre de usuario</p>
            <p className="text-lg">{user?.user}</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">Correo electrónico</p>
            <p className="text-lg">{user?.email}</p>
          </div>
        </div>
      </div>

      <div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleLogout()}
        >
          Cerrar sesión
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              Eliminar cuenta
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar cuenta</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <p>¿Estás seguro de querer eliminar tu cuenta?</p>
              <Button variant="destructive" onClick={() => handleDeleteAccount()}>
                Eliminar cuenta
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default InfoUserSection;
