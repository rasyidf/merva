import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from "./AnimatedDashboard.module.css"

export function AnimatedDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  }) 
  const rotateX = useTransform(scrollYProgress, [0.2, 0.8], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1])

  return (
    <div ref={ref} className={styles.container}>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
        }}
        className={styles.motionDiv}
      >
        <img 
          src="/hero.png"
          alt="Dashboard Preview" 
          className={styles.image}
        />
      </motion.div>
    </div>
  )
}

