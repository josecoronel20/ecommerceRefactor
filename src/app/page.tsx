import ProductosDestacados from "@/components/home/ProductosDestacados";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main>
      <section className="flex flex-col items-center justify-center h-96 gap-5 pt-20">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-6xl font-bold text-violet-600 text-center">Descubre Productos Exclusivos</h1>
          <p className="text-gray-500 w-3/4 text-center">
            Explora nuestra colección cuidadosamente seleccionada de productos
            premium con un diseño elegante y minimalista.
          </p>
        </div>

        <Button variant="violet">
          <Link href="/productos">Ver colección</Link>
        </Button>
      </section>

      <ProductosDestacados />
    </main>
  );
};

export default Home;
