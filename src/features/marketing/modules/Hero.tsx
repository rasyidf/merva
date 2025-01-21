import styles from "./Hero.module.css";
import { AppLogo } from "@/shared/components/ui/icon";
import { AnimatedDashboard } from "./animated-dashboard";
import { motion } from "motion/react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import clsx from "clsx";

export function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <AppLogo className={styles.logo} />
          <span className="text-gray-800">Crafting Digital Excellence</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.heading}>
          Ocean of Innovations,
          <br />
          Wave of Solutions
        </motion.h1>

        <p className={styles.paragraph}>
          From concept to launch, BWDX provides design, development, and consultation services to help your business stand out in a crowded digital world.
        </p>

        <div className={styles.buttonContainer}>
          <Button size="lg" component={Link} to="/contact" className={clsx(styles.button, styles.hero)}
            leftSection={
              <span className="ml-2">→</span>
            }
          >
            Let's Discuss
          </Button>
        </div>

        <AnimatedDashboard />
      </div>
    </section>
  );
}

export default Hero;