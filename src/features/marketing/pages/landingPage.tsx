import React from 'react';
import Hero from '../modules/Hero';
import Features from '../modules/Features';
import Portfolio from '../modules/Portfolio';
import Testimonials from '../modules/Testimonials';
import Contact from '../modules/Contact';
import { Header } from '../modules/header';
import Footer from '../modules/footer';
import styles from './LandingPage.module.css';
import { ScrollArea } from '@mantine/core';

export const Component: React.FC = () => {
  return (
    <>
      <ScrollArea h="100vh" className={styles.landingPage}>
        <Header />
        <Hero />
        <Features /> 
        <Contact />
        <Footer />
      </ScrollArea>
    </>
  );
};



Component.displayName = "FeatureNamePage"; 