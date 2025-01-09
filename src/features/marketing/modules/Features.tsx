import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { SvgIcon } from '@/shared/components/ui/icon';
import { Container, Text, ThemeIcon } from '@mantine/core';
import styles from './Features.module.css';

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode; }> = ({ title, description, icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animation = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      animation.start('visible');
    }
  }, [isInView, animation]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={animation}
      className={styles.featureCard}
    >
      <ThemeIcon variant="light" size={48} className={styles.icon}>{icon}</ThemeIcon>
      <Text className={styles.title} fw={600} fz={24}>{title}</Text>
      <Text className={styles.description} fz={16}>{description}</Text>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    { title: 'Modular Architecture', description: 'Easily extendable and customizable components', icon: <SvgIcon name='puzzle' /> },
    { title: 'React + Vite', description: 'Lightning-fast development and production builds', icon: <SvgIcon name='zap' /> },
    { title: 'Production Ready', description: 'Optimized for performance and scalability', icon: <SvgIcon name='scale' /> },
    { title: 'Modern CSS', description: 'Flexible and powerful styling solutions', icon: <SvgIcon name='paintbrush' /> },
    { title: 'Comprehensive Documentation', description: 'Detailed guides and API references', icon: <SvgIcon name='book' /> },
    { title: 'Continuous Updates', description: 'Regular improvements and new features', icon: <SvgIcon name='refreshCw' /> },
  ];

  return (
    <Container component={"section"} id="features" className={styles.features} size="xl">

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Features
      </motion.h2>
      <div className={styles.featureGrid}>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

    </Container>
  );
};

export default Features;

