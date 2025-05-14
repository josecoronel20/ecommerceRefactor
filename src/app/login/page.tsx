"use client";

import { Button } from "@/components/ui/button";
import useIsLogged from "@/hooks/useIsLogged";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const usersArray = localStorage.getItem("users");
  const users = usersArray ? JSON.parse(usersArray) : [];
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userIsRegistered = users.find(
      (u: any) => u.user === user && u.password === password
    );
    if (userIsRegistered) {
      localStorage.setItem("token", user);
      window.location.href = "/";
    } else {
      setError(true);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-violet-600">Violet Shop</h1>
          <p className="text-gray-600 mt-2">
            Inicia sesión para continuar comprando
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
              onChange={(e) => setUser(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <p
            className={`${
              error ? "block" : "hidden"
            } text-red-500 w-full text-center`}
          >
            Usuario o contraseña incorrectos
          </p>

          <Button type="submit" variant="violet" className="w-full">
            Iniciar sesión
          </Button>

          <Button variant="outline" className="w-full">
            <Link href="/login/register">Registrarse</Link>
          </Button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
