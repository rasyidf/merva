import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

import { AppLogo } from "@/shared/components/ui/icon/appLogo";
import { Button, Group } from '@mantine/core';
import { useViewNavigate } from '@/shared/utils/routers';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const viewNavigate = useViewNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isAuthenticated = false;
  const authButton = isAuthenticated ? (
    <Button variant="filled" onClick={() => viewNavigate("/app/dashboard")}>
      Dashboard
    </Button>
  ) : (
    <>
      <Button variant="outline" onClick={() => viewNavigate("/auth/register")}>
        Sign Up
      </Button>
      <Button variant="filled" onClick={() => viewNavigate("/auth/login")}>
        Sign In
      </Button>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <AppLogo />
      </div>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="#features">Features</Link></li>
          <li><Link to="#portfolio">Portfolio</Link></li>
          <li><Link to="/docs">Docs</Link></li>
          <li><Link to="#contact">Contact</Link></li>
        </ul>
      </nav>
      <button className={styles.menuToggle} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Group>

        {authButton}
      </Group>
    </header>
  );
};

