import { ApiProduct } from '@/types/product';
import { Purchase } from '@/types/cart';
import React from 'react';
import useGetUser from '@/hooks/useGetUser';

const HistorySection = () => {
  const { user } = useGetUser();

  // Se obtiene el historial de compras del usuario
  const purchases = user?.purchases || [];

  return (
    <section className="flex flex-col gap-4 justify-center items-center p-4 border border-gray-200 rounded-lg w-full">
      <h1 className="text-2xl font-bold">Mi historial de compras</h1>

      <div className="flex flex-col gap-4 w-full">
        {purchases.length > 0 ? (
          purchases.map((purchase: Purchase, index: number) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg w-full">
              <p className="text-lg font-bold">Compra n°{index + 1}</p>

              {purchase.products.map((item: ApiProduct) => (
                <div key={item.id} className="grid grid-cols-4 w-full justify-between py-2">
                  <p className="text-sm col-span-2">{item.title}</p>

                  <p className="text-sm col-span-1 text-right">x{item.quantity}</p>

                  <p className="text-sm col-span-1 text-right">${item.price}</p>
                </div>
              ))}

              <div className="flex w-full justify-between border-t-2 border-gray-200 mt-4 pt-4">
                <p className="text-lg text-right font-semibold">Total:</p>
                <p className="text-lg text-right font-semibold">${purchase.total}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay compras</p>
        )}
      </div>
    </section>
  );
};

export default HistorySection;
