"use client";
import React from "react";
import { CartIcon } from "@/assets/icons";
import useToggle from "@/hooks/useToggle";

const Carrito = () => {
  const { isOpen, toggle } = useToggle();
  return (
    <div>
      <div
        className="cursor-pointer hover:bg-gray-100 rounded duration-150 ease-in-out p-2"
        onClick={toggle}
      >
        {<CartIcon />}
      </div>

      {isOpen && (
        <div className="absolute top-0 right-0 w-full h-screen bg-black/50 " onClick={toggle}>
          <div className="bg-white absolute top-0 right-0 w-1/2 h-full" onClick={(e) => e.stopPropagation()}>
            <h1>Carrito</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
