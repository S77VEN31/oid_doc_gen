'use client';
// React
import React, { useState } from 'react';
// Next
import Link from 'next/link';
// Global
import { classes } from '@/global/handleClassnames';
// Styles
import './NavBarMenu.style.css';

const NavBarMenu: React.FC = () => {
  const [option, setOption] = useState('home');
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
