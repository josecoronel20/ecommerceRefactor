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

const page = () => {
  const [inputUser, setInputUser] = useState<string>("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const { setUsers } = useUserStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Se obtiene el array de usuarios
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // Se busca el usuario en el array de usuarios
    const userExists = users.find((u: any) => u.user === inputUser);

    // Si el usuario existe, se setea el error
    if (userExists) {
      setError(true);
    } else {
      // Si el usuario no existe, se agrega al array de usuarios
      users.push({ user: inputUser, email: inputEmail, password: inputPassword });

      // Se guarda el array de usuarios en el localStorage y se actualiza el estado
      setUsers(users);
      // Se setea el error a false
      setError(false);
      // Se abre el modal
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
        router.push("/login");
      }, 1000);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-violet-600">Violet Shop</h1>
          <p className="text-gray-600 mt-2">
            Registrate para continuar comprando
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              onChange={(e) => setInputUser(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
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
              onChange={(e) => setInputEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
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
              onChange={(e) => setInputPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <p
            className={`${
              error ? "block" : "hidden"
            } text-red-500 w-full text-center`}
          >
            el usuario ya existe
          </p>

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
