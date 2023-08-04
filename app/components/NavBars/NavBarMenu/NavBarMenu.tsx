'use client';
// React
import React, { useState, useEffect } from 'react';
// Next
import Link from 'next/link';
// Global
import { classes } from '@/global/handleClassnames';
// Styles
import './NavBarMenu.style.css';

const NavBarMenu: React.FC = () => {
  const [option, setOption] = useState(() => {
    // Intenta obtener el valor de 'option' desde localStorage al cargar el componente
    const savedOption = localStorage.getItem('selectedOption');
    return savedOption ? savedOption : 'home'; // Si no hay valor, utiliza 'home' como valor predeterminado
  });

  useEffect(() => {
    // Almacena el estado 'option' en localStorage cada vez que cambie
    localStorage.setItem('selectedOption', option);
  }, [option]);
  const options = [
    {
      children: 'aruba',
      href: '/',
      key: 'home',
    },
    {
      children: 'search',
      href: '/search',
      key: 'search',
    },
    {
      children: 'about',
      href: '/about',
      key: 'about',
    },
  ];
  return (
    <nav className="nav">
      {options.map(({ key, ...props }) => {
        const className = classes([`button ${option === key ? 'active' : ''}`]);
        const onClick = (): void => setOption(key);
        return (
          <Link {...props} key={key} className={className} onClick={onClick} />
        );
      })}
    </nav>
  );
};
export default NavBarMenu;
