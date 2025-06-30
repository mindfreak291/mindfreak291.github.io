import HomepageBackground from '@/components/animations/homeBackground/homeBackground';
import RainbowConfigurator from '@/components/animations/rainbowConfigurator/rainbowConfigurator';
import React from 'react';


const Homepage = () => {
  return (
    <div className="homepage">
      <HomepageBackground />
      <RainbowConfigurator />
      
      <div className="content">
        <div className="hero-section">
          <h1 className="hero-title">
            Hi, I'm <span className="name-highlight">Sahil Walecha</span>
          </h1>
          <p className="hero-subtitle">
            Lead Frontend Developer
          </p>
          <p className="hero-description">
          I craft modern web applications with React, TypeScript, and cutting-edge frameworks. Specializing in component architecture, state management, and performance optimization.
          </p>
          
          <div className="hero-buttons">
            <a href="/about-sahil" className="btn btn-primary ">About Me</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .homepage {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content {
          position: relative;
          max-width: 800px;
          padding: 2rem;
          text-align: center;
          margin-top: 150px;
        }

        .hero-section {
          animation: fadeInUp 1s ease-out;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-color);
          line-height: 1.2;
        }

        .name-highlight {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-color);
          opacity: 0.7;
          margin-bottom: 1.5rem;
        }

        .hero-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-color);
          opacity: 0.6;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.75rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-color);
          border: 2px solid var(--text-color);
        }

        .btn-secondary:hover {
          background: var(--text-color);
          color: var(--bg-color);
          transform: translateY(-2px);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile responsiveness */
        @media screen and (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.3rem;
          }
          
          .hero-description {
            font-size: 1rem;
            margin-bottom: 2rem;
          }
          
          .content {
            padding: 1rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 200px;
          }
        }

        /* Dark theme adjustments */
        [data-theme="dark"] .name-highlight {
          background: linear-gradient(135deg, #818cf8, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .hero-section {
            animation: none;
          }
          
          .btn:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;