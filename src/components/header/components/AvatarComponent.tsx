import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { LogOut, User, UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import Link from "next/link";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";

const AvatarComponent = () => {
  const router = useRouter();
  const { userInfo } = useUserInfo();

  const handleLogout = () => {
    Cookies.remove('token')
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {userInfo && userInfo.image ? (
            <AvatarImage src={userInfo.image} onClick={() => console.log(userInfo.image)}/>
          ) : (
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      {userInfo ? (<DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          className="cursor-pointer flex items-center gap-2"
          onClick={() => router.push("/profile")}
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
      </DropdownMenuContent>) 
      : 
      <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuItem
        className="cursor-pointer flex items-center gap-2"
        onClick={() => router.push("/login")}
      >
        <User className="h-4 w-4" />
        <Link href="/login">Iniciar sesion</Link>
      </DropdownMenuItem>
      
    </DropdownMenuContent>}
    </DropdownMenu>
  );
};

export default AvatarComponent;
