import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';
import { authApi } from '@/lib/api/auth';
import useGetUser from '@/hooks/useGetUser';
import { Skeleton } from '@/components/ui/skeleton';
import NicknameSection from './NickNameSection';
import useToggle from '@/hooks/useToggle';
import { userApi } from '@/lib/api/user';
import { useRouter } from 'next/navigation';

const InfoUserSection = () => {
  const { user, isLoading, mutate } = useGetUser();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      await userApi.deleteUser(user?.id as number);
      router.push('/login');
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      mutate();
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <section className="flex flex-col gap-4 justify-center items-center p-4 border border-gray-200 rounded-lg w-full">
      <h1 className="text-2xl font-bold">Mi perfil</h1>
      <h2 className="text-lg font-bold">Perfil de usuario</h2>

      <div className="flex gap-4 justify-center items-center w-full">
        <div className="flex flex-col gap-4">
          <NicknameSection />

          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">Nombre de usuario</p>
            {isLoading ? (
              <Skeleton className="w-56 h-5" />
            ) : (
              <p className="text-lg">{user?.user}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">Correo electrónico</p>
            {isLoading ? (
              <Skeleton className="w-56 h-5" />
            ) : (
              <p className="text-lg">{user?.email}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Button variant="outline" className="w-full" onClick={() => handleLogout()}>
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
              <DialogDescription>
                ¿Estás seguro de querer eliminar tu cuenta? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              
              <Button variant="destructive" onClick={() => handleDeleteAccount()}>
                Eliminar cuenta
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default InfoUserSection;
