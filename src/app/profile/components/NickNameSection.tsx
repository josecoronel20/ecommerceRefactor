'use client';

import {
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from '@/assets/components/ui/dialog';

import { DialogContent } from '@/assets/components/ui/dialog';
import { Dialog } from '@/assets/components/ui/dialog';
import { Button } from '@/assets/components/ui/button';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { User } from '@/types/types';
import { useState } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import { updateUser } from '@/lib/api/auth';

const NickNameSection = () => {
  const { register, handleSubmit } = useForm<{ nickname: string }>();
  const { userInfo, mutate } = useUserInfo();
  const [open, setOpen] = useState(false); // estado del diálogo

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedUser = { ...userInfo, nickname: data.nickname };
      const response = await updateUser(updatedUser as User);
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
        <p className="text-lg">{userInfo?.nickname ? userInfo?.nickname : 'sin nickname'}</p>
      </div>
    </div>
  );
};

export default NickNameSection;
