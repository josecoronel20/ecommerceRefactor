import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User, UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import  useUserStore  from "@/store/useUserStore";

const AvatarComponent = () => {
  const {user,token} = useUserStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {token && user?.image ? (
            <AvatarImage src={user.image} />
          ) : (
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      {token ? (<DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          className="cursor-pointer flex items-center gap-2"
          onClick={() => window.location.href = "/profile"}
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
      </DropdownMenuContent>) : 
      <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuItem
        className="cursor-pointer flex items-center gap-2"
        onClick={() => console.log("View profile")}
      >
        <User className="h-4 w-4" />
        <Link href="/login">Iniciar sesion</Link>
      </DropdownMenuItem>
      
    </DropdownMenuContent>}
    </DropdownMenu>
  );
};

export default AvatarComponent;
