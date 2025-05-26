"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UserRegister } from "@/types/types";
import { register } from "@/lib/apiUser";

const page = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<{ user: string; email: string; password: string }>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await register(data as UserRegister);

      if (response.ok) {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
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
              {...registerField("user", {
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
              {...registerField("email", {
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
              {...registerField("password", {
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
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
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
