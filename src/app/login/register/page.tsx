"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import { useForm } from "react-hook-form";

const page = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const { setUsers } = useUserStore();
  const { register, handleSubmit, formState: { errors } } = useForm<{ user: string; email: string; password: string }>();

  const onSubmit = handleSubmit((data) => {
    // Se obtiene el array de usuarios
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // Se busca el usuario en el array de usuarios
    const userExists = users.find((u: any) => u.user === data.user);

    // Si el usuario existe, se setea el error
    if (!errors.user || !errors.email || !errors.password || !userExists) {
      // Si el usuario no existe, se agrega al array de usuarios
      users.push({ user: data.user, email: data.email, password: data.password });
      // Se guarda el array de usuarios en el localStorage y se actualiza el estado
      setUsers(users);
      // Se abre el modal
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
        router.push("/login");
      }, 1000);
    }
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-violet-600">Violet Shop</h1>
          <p className="text-gray-600 mt-2">
            Registrate para continuar comprando
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="user"
              className="block text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              type="text"
              id="user"
              placeholder="Usuario"
              {...register("user", { 
                required: {
                  value: true,
                  message: "El usuario es requerido",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { 
                required: {
                  value: true,
                  message: "El email es requerido",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              {...register("password", { 
                required: {
                  value: true,
                  message: "La contraseña es requerida",
                },
                minLength: {
                  value: 3,
                  message: "La contraseña debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 10,
                  message: "La contraseña debe tener máximo 10 caracteres",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {errors.user && <p className="text-red-500">{errors.user.message}</p>}
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Button type="submit" variant="violet" className="w-full">
            registrarse
          </Button>

          <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent>Te registraste correctamente</DialogContent>
          </Dialog>
        </form>
      </section>
    </main>
  );
};

export default page;

