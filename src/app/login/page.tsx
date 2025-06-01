'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { UserLogin } from '@/types/types';
import { login } from '@/lib/apiUser';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ user: string; password: string }>();
  const [unFoundUser, setUnFoundUser] = useState(false);


  // Manejador del formulario de inicio de sesión
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await login(data as UserLogin);
      if (response.user) {
        router.push('/');
      } else {
        setUnFoundUser(true);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setUnFoundUser(true);
    }
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-violet-600">Violet Shop</h1>
          <p className="text-gray-600 mt-2">Inicia sesión para continuar comprando</p>
        </header>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              id="user"
              placeholder="Usuario"
              {...register('user', {
                required: {
                  value: true,
                  message: 'El usuario es requerido',
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              {...register('password', {
                required: {
                  value: true,
                  message: 'La contraseña es requerida',
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {errors.user && <p className="text-red-500">{errors.user.message}</p>}
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          {unFoundUser && <p className="text-red-500">Usuario o contraseña incorrectos</p>}

          <Button type="submit" variant="violet" className="w-full">
            Iniciar sesión
          </Button>

          <Button variant="outline" className="w-full" asChild>
            <Link href="/login/register">Registrarse</Link>
          </Button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
