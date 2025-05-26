"use client";

import React from "react";
import MenuNav from "./components/MenuNav";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AvatarComponent from "./components/AvatarComponent";
import { useEffect } from "react";
import Cart from "./components/Cart";
import useUserInfo from "@/hooks/useUserInfo";

const Header = () => {
  //todo:mudar el fetching productos a componentes productos destacados
  const pathName = usePathname();
  const isLoginOrRegister =
    pathName === "/login" || pathName === "/login/register";

  return (
    !isLoginOrRegister && (
      <section className="flex justify-between items-center p-4 fixed w-full z-10 bg-white border-b border-gray-200">
        <Link
          href="/"
          className="text-xl font-bold text-violet-500 cursor-pointer"
        >
          Violet Shop
        </Link>

        <div className="flex flex-row-reverse md:flex-row items-center gap-4">
          <MenuNav />

          <Cart />

          <AvatarComponent />
        </div>
      </section>
    )
  );
};

export default Header;
