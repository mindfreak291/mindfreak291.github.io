import React, { useState } from 'react';
import styles from './navigationComponent.module.css';
import ThemeToggle from '../themetoggle/themeToggle';

const NavigationComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Animated Logo */}
        <div className={styles.navMenu}>
          <a href="/" className={styles.navLink}>Sahil Walecha</a>
        </div>
        {/* Desktop Navigation */}
        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
        <li className={styles.navItem}>
            <a href="/" className={styles.navLink}>Home</a>
          </li>
          <li className={styles.navItem}>
            <a href="/about-sahil" className={styles.navLink}>About</a>
          </li>
          <li className={styles.navItem}>
            <a href="/experience" className={styles.navLink}>Experience</a>
          </li>
        </ul>
        <div className={styles.navActions}>
          <ThemeToggle />
          {/* Mobile Menu Toggle */}
          <div
            className={`${styles.navToggle} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationComponent;