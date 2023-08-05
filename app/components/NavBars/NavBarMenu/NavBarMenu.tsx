'use client';
// React
import React, { useState, useEffect } from 'react';
// Next
import Link from 'next/link';
// Styles
import './NavBarMenu.style.css';
// Global
import { classes } from '@/global/handleClassnames';
// Enumerables
import { navBarOptions } from '@/enumerables/navBarOptions';

const NavBarMenu: React.FC = () => {
  const [option, setOption] = useState<string>('home'); // Default value

  useEffect(() => {
    // Read 'selectedOption' from localStorage and update the state when the component is mounted on the client side
    const savedOption = localStorage.getItem('selectedOption');
    if (savedOption) {
      setOption(savedOption);
    }
  }, []);

  useEffect(() => {
    // Store the 'option' state in localStorage whenever it changes
    localStorage.setItem('selectedOption', option);
  }, [option]);

  return (
    <nav className="nav">
      {navBarOptions.map(({ key, ...props }) => {
        const className = classes([`button ${option === key && 'active'}`]);
        const onClick = (): void => setOption(key);
        return (
          <Link {...props} key={key} className={className} onClick={onClick} />
        );
      })}
    </nav>
  );
};
export default NavBarMenu;
