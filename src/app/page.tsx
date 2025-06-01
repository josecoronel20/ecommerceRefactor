import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { Suspense } from 'react';
import PopularProducts from '@/app/componentsHome/PopularProducts';
import PopularProductsSkeleton from './componentsHome/PopularProductsSkeleton';

const Home = () => {
  return (
    <main>
      <section className="flex flex-col items-center justify-center h-screen md:h-96 gap-5 pt-36 ">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-6xl font-bold text-violet-600 text-center">
            Descubre Productos Exclusivos
          </h1>
          <p className="text-gray-500 w-3/4 text-center">
            Explora nuestra colección cuidadosamente seleccionada de productos premium con un diseño
            elegante y minimalista.
          </p>
        </div>

        <Button variant="violet">
          <Link href="/productos">Ver colección</Link>
        </Button>
      </section>

      <PopularProducts />
    </main>
  );
};

export default Home;
