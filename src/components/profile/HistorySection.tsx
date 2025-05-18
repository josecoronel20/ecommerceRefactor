import useUserStore from "@/store/useUserStore";
import React from "react";
import { Compra, Producto } from "@/types/types";

const HistorySection = () => {
  const { user} = useUserStore();

  // Se obtiene el historial de compras del usuario
  const compras = user?.compras || [];

  return (  
    <section className="flex flex-col gap-4 justify-center items-center p-4 border border-gray-200 rounded-lg w-full">
      <h1 className="text-2xl font-bold">Mi historial de compras</h1>

      <div className="flex flex-col gap-4 w-full">
        {compras.map((compra: Compra,index: number) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg w-full"
          >
            <p className="text-lg font-bold">Compra n°{index + 1}</p>

            {compra.productos.map((item: Producto) => (
              <div key={item.id} className="flex w-full justify-between">
                <p className="text-sm">
                  {item.nombre} x{item.cantidad}
                </p>

                <p className="text-sm">${item.precio}</p>
              </div>
            ))}

            <div className="flex w-full justify-between border-t-2 border-gray-200 mt-4 pt-4">
              <p className="text-lg text-right font-semibold">Total:</p>
              <p className="text-lg text-right font-semibold">
                $
                {compra.productos.reduce(
                  (acc, item) => acc + item.precio * item.cantidad,
                  0
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistorySection;
