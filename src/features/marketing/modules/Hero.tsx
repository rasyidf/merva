import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import { AppLogo } from '@/shared/components/ui/icon';
import { Button } from '@mantine/core';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Welcome to Merva</h1>
        <p>A modular ecosystem React Vite app boilerplate and portfolio showcase</p>
        <div className={styles.cta}>
          <Button component={Link} size='lg' to="/docs" variant='white'>Get Started</Button>
          <Button component={Link} size='lg' to="/portfolio" color="white" variant='outline'>View Portfolio</Button>
        </div>
      </div>
      <div className={styles.illustration}>
        <AppLogo color='white' width={'30dvw'} height={'30dvw'} />
      </div>
    </section>
  );
};

export default Hero;

