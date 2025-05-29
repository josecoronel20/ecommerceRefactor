"use client";

import React from "react";
import MenuNav from "./components/MenuNav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AvatarComponent from "./components/AvatarComponent";
import Cart from "./components/Cart";

const Header = () => {
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
