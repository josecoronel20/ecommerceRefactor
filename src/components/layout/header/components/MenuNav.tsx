import React from 'react';
import Link from 'next/link';
import { MenuIcon } from '@/assets/icons';
import useToggle from '@/hooks/useToggle';
import { Button } from '../../../ui/button';

const MenuNav = () => {
  const { isOpen, toggle } = useToggle();

  const navLinks = [
    {
      label: 'Inicio',
      href: '/',
    },
    {
      label: 'Productos',
      href: '/productos',
    },
  ];

  const LinkComponent = ({ label, href }: { label: string; href: string }) => {
    return (
      <li className="hover:text-violet-600 ease-in-out duration-200" onClick={toggle}>
        <Link href={href}>{label}</Link>
      </li>
    );
  };

  return (
    <div>
      <Button variant="ghost" className="md:hidden z-40 relative" onClick={toggle}>
        <MenuIcon />
      </Button>

      {isOpen && (
        <ul className="flex flex-col justify-center items-center gap-4 absolute top-0 left-0 w-full h-screen bg-white z-20">
          {navLinks.map((link) => {
            return <LinkComponent key={link.href} label={link.label} href={link.href} />;
          })}
        </ul>
      )}

      <ul className="hidden md:flex gap-4">
        {navLinks.map((link) => {
          return <LinkComponent key={link.href} label={link.label} href={link.href} />;
        })}
      </ul>
    </div>
  );
};

export default MenuNav;
