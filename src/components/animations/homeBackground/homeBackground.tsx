import React, { useState, useEffect } from 'react';
import styles from './HomepageBackground.module.css';

const HomepageBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const flashlightStyle = {
    background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
      rgba(99, 102, 241, 0.2) 0%, 
      rgba(99, 102, 241, 0.1) 40%, 
      transparent 70%)`,
    opacity: isHovering ? 1 : 0,
  };

  return (
    <div 
      className={styles.homepageBackground}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Flashlight effect */}
      <div 
        className={styles.flashlightEffect}
        style={flashlightStyle}
      />

      {/* Subtle gradient background */}
      <div className={styles.gradientBg}></div>
      
      {/* Floating geometric shapes */}
      <div className={styles.shapes}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`${styles.shape} ${styles[`shape${i + 1}`]}`}></div>
        ))}
      </div>
      
      {/* Subtle dot pattern */}
      <div className={styles.dotPattern}></div>
    </div>
  );
};

export default HomepageBackground;