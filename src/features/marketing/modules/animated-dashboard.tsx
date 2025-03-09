"use client";

import { useRef } from 'react'
import styles from "./AnimatedDashboard.module.css"

export function AnimatedDashboard() {

  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.container}>
        <div
          className={styles.animatedDiv}
        >
          <img
            src="/hero.png"
            alt="Dashboard Preview"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  )
}

