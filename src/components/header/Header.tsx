'use client';

import React from "react";
import MenuNav from "./MenuNav";
import Carrito from "./Carrito";
const Header = () => {
  return (
    <section className="flex justify-between items-center p-4 fixed w-full z-10 bg-white border-b border-gray-200">
      <div className="text-xl font-bold text-violet-500">Violet Shop</div>

      <MenuNav />

      <div>
        <Carrito />
      </div>
    </section>
  );
};

export default Header;
