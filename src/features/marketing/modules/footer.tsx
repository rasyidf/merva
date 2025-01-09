import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';
import { Container, Group, Text } from '@mantine/core';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>Merva</h4>
          <p>A modular ecosystem React Vite app boilerplate and portfolio showcase.</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="#features">Features</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/docs">Documentation</Link></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h4>Connect</h4>
          <ul>
            <li><a href="https://github.com/tessra" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://twitter.com/rasyidf_" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><Link to="#contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <Container size="xl" p={8}>
          <Text size="sm" c="white">Made with ❤️ 2020 - {new Date().getFullYear()} rasyidf.</Text>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

