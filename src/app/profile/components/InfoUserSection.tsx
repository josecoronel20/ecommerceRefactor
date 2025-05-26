import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { deleteUser } from "@/lib/apiUser";
import useUserInfo from "@/hooks/useUserInfo";
import { logout } from "@/lib/apiUser";
import { Skeleton } from "@/components/ui/skeleton";
import NicknameSection from "./NickNameSection";

const InfoUserSection = () => {
  const { userInfo, isLoading } = useUserInfo();

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUser(userInfo?.id as number);
      logout();
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
        

        <div className="flex flex-col gap-4">
          <NicknameSection />

          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">Nombre de usuario</p>
            {isLoading ? (
              <Skeleton className="w-56 h-5" />
            ) : (
              <p className="text-lg">{userInfo?.user}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">Correo electrónico</p>
            {isLoading ? (
              <Skeleton className="w-56 h-5" />
            ) : (
              <p className="text-lg">{userInfo?.email}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => logout()}
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
