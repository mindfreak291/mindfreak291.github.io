import React, { useState } from 'react';
import './logo.css';

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="animated-logo">
      <a 
        href="/"
        className={`logo-link ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Sahil Walecha
      </a>
    </div>
  );
};

export default Logo;