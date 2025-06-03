'use client';

import {
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { User } from '@/types/auth';
import { useState } from 'react';
import useGetUser from '@/hooks/useGetUser';
import { authApi } from '@/lib/api/auth';

const NickNameSection = () => {
  const { register, handleSubmit } = useForm<{ nickname: string }>();
  const { user, mutate } = useGetUser();
  const [open, setOpen] = useState(false); // estado del diálogo

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedUser = { ...user, nickname: data.nickname };
      await authApi.updateUser(updatedUser as User);
      mutate(updatedUser as User, false);
      setOpen(false);
    } catch (error) {
      console.error('Error al actualizar el nickname:', error);
    }
  });

  return (
    <div className="flex flex-row-reverse justify-between">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Pencil />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar nickname</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="nickname">Nuevo nickname</label>
                <input
                  type="text"
                  placeholder="Escribe aquí tu nuevo nickname"
                  {...register('nickname')}
                />
              </div>
              <Button type="submit">Guardar</Button>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <div>
        <p className="text-lg font-bold">Nickname</p>
        <p className="text-lg">{user?.nickname ? user?.nickname : 'sin nickname'}</p>
      </div>
    </div>
  );
};

export default NickNameSection;
