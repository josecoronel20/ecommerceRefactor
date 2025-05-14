'use client';

import React from "react";
import MenuNav from "./MenuNav";
import Carrito from "./Carrito";
import Link from "next/link";
const Header = () => {
  return (
    <section className="flex justify-between items-center p-4 fixed w-full z-10 bg-white border-b border-gray-200">
      <Link href="/" className="text-xl font-bold text-violet-500 cursor-pointer">Violet Shop</Link>

      <div className="flex flex-row-reverse md:flex-row items-center gap-4">
      <MenuNav />

        <Carrito />
      </div>
    </section>
  );
};

export default Header;
