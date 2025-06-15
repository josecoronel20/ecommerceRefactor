'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { UserLogin } from '@/types/auth';
import { authApi } from '@/lib/api/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  user: z
    .string()
    .min(1, 'El usuario es requerido')
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(20, 'El usuario no puede tener más de 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'El usuario solo puede contener letras, números y guiones bajos'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(50, 'La contraseña no puede tener más de 50 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', // Valida mientras el usuario escribe
  });
  const [unFoundUser, setUnFoundUser] = useState(false);

  // Manejador del formulario de inicio de sesión
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await authApi.login(data as UserLogin);
      if (response.message === 'Login exitoso') {
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
              {...register('user')}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.user ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.user && (
              <p className="text-red-500 text-sm mt-1">{errors.user.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              {...register('password')}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {unFoundUser && <p className="text-red-500">Usuario o contraseña incorrectos</p>}

          <Button 
            type="submit" 
            variant="violet" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>

          <Button variant="outline" className="w-full" asChild>
            <Link href="/register">Registrarse</Link>
          </Button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
