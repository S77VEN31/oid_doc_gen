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
  const [option, setOption] = useState<string>('home'); // Default value

  useEffect(() => {
    // Read 'selectedOption' from localStorage and update the state when the component is mounted on the client side
    const savedOption = localStorage.getItem('selectedOption');
    if (savedOption) {
      setOption(savedOption);
    }
  }, {});

  useEffect(() => {
    // Store the 'option' state in localStorage whenever it changes
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
