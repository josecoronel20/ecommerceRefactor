import React, { useEffect, useState } from 'react';
import { Avatar } from '../../../ui/avatar';
import { LogOut, User, UserIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import useGetUser from '@/hooks/useGetUser';
import { authApi } from '@/lib/api/auth';

const AvatarComponent = () => {
  const router = useRouter();
  const { user, mutate } = useGetUser();

  const handleLogout = async () => {
    await authApi.logout();
    mutate();
  };

  return (
    <DropdownMenu data-testid="DropdownMenu">
      <DropdownMenuTrigger data-testid="DropdownMenuTrigger">
        <Avatar>
          <UserIcon />
        </Avatar>
      </DropdownMenuTrigger>

      {user ? (
        <DropdownMenuContent align="end" className="w-56" data-testid="DropdownMenuContent">
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2"
            onClick={() => router.push('/profile')}
          >
            <User className="h-4 w-4" />
            <span>Ver perfil</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2 text-destructive"
            onClick={() => handleLogout()}
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent data-testid="DropdownMenuContent" align="end" className="w-56">
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2"
            onClick={() => router.push('/login')}
          >
            <User className="h-4 w-4" />
            <Link href="/login">Iniciar sesión.</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default AvatarComponent;
