"use client";
import Image from "next/image";
import styles from "./LandingPage.module.css";

export default function landingPage() {
  return (
    <div className={styles.container}>
      {/* Top Navigation */}
      <nav className={styles.navbar}>
        <ul>
          <li className={styles.active}>Home</li>
          <li>Movies</li>
          <li>Music</li>
          <li>Trending</li>
          <li>Search</li>
        </ul>
      </nav>

      {/* Top row images */}
      <div className={styles.imageRow}>
        <div className={`${styles.imageBox} ${styles.green}`}>
          <Image src="/mfy1.jpg" alt="Musician 1" fill priority />
        </div>
        <div className={`${styles.imageBox} ${styles.yellow}`}>
          <Image src="/mfy2.jpg" alt="Musician 2" fill priority />
        </div>
      </div>

      {/* Center text */}
      <div className={styles.textSection}>
        <h1>Unleash Your Soundtrack</h1>
        <p>Stream the best movies and music anytime, anywhere</p>
        <button className={styles.cta}>Start Streaming</button>
      </div>

      {/* Bottom row images */}
      <div className={styles.imageRow}>
        <div className={`${styles.imageBox} ${styles.orange}`}>
          <Image src="/mfy3.jpg" alt="Musician 3" fill priority />
        </div>
        <div className={`${styles.imageBox} ${styles.red}`}>
          <Image src="/mfy4.jpg" alt="Musician 4" fill priority />
        </div>
      </div>
    </div>
  );
}
