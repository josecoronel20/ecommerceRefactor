import React from "react";
import Link from "next/link";

const MenuNav = () => {
  const navLinks = [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Productos",
      href: "/productos",
    },
    {
      label: "Categorias",
      href: "/categorias",
    },
    {
      label: "Ofertas",
      href: "/ofertas",
    },
  ];

  const LinkComponent = ({ label, href }: { label: string; href: string }) => {
    return (
      <li className="hover:text-violet-600 ease-in-out duration-200">
        <Link href={href}>{label}</Link>
      </li>
    );
  };
  
  return (
    <ul className="flex gap-4">
      {navLinks.map((link) => {
        return <LinkComponent key={link.href} label={link.label} href={link.href} />;
      })}
    </ul>
  );
};

export default MenuNav;
