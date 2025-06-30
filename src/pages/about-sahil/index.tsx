import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import styles from './aboutSahil.module.css';

const AboutSahilPage: NextPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [currentFact, setCurrentFact] = useState(0);

  const skills = [
    { name: 'React', level: 95, color: '#61DAFB' },
    { name: 'TypeScript', level: 95, color: '#3178C6' },
    { name: 'Next.js', level: 90, color: '#000000' },
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'GraphQL', level: 75, color: '#E10098' },
    { name: 'AWS', level: 70, color: '#FF9900' }
  ];

  const funFacts = [
    "I debug with console.log() and I'm proud of it 🐛", 
    "My favorite CSS property is `transform` - it's pure magic ✨",
    "I once spent 4 hours debugging... a missing semicolon 😅",
    "I dream in JSX and wake up thinking about component trees 🌳",
    "Coffee is my primary programming language ☕",
    "I've mentored 20+ developers and loved every minute 👨‍🏫"
  ];

  const timeline = [
    {
        year: "2021 - Present",
        title: "Staff Engineer",
        description: "Leading architectural decisions and mentoring teams while building scalable component libraries. Every line of code now impacts multiple enterprise applications—the responsibility is both thrilling and humbling.",
        icon: "🚀"
      },
    {
        year: "2019", 
        title: "Team Lead",
        description: "Stepped into leadership while architecting government systems. Learned that managing people is harder than managing state, but infinitely more rewarding when you see your team grow.",
        icon: "👨‍💼"
    },
    {
        year: "2018",
        title: "Software Developer",
        description: "Dove deep into responsive design and cross-browser compatibility. Spent countless hours making pixels perfect and discovered that 'it works on my machine' is never an acceptable answer.",
        icon: "🎨"
    },
    {
        year: "2017",
        title: "The Beginning",
        description: "Started my journey with internships at TCS and IBM, exploring everything from Android development to network optimization. Every bug was a mystery to solve, every feature a mountain to climb.",
        icon: "🌱"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(`.${styles.fadeIn}`);
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          el.classList.add(styles.visible);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <div className={`${styles.heroSection} ${isVisible ? styles.visible : styles.hidden}`}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroTextContent}>
            <h1 className={styles.heroTitle}>
              Hey, I'm Sahil! 👋
            </h1>
            <p className={styles.heroSubtitle}>
              A Lead Frontend Developer who transforms caffeine into React components and turns complex problems into elegant, user-friendly solutions. I believe great code should be beautiful, performant, and tell a story.
            </p>
            <div className={styles.funFactCard}>
              <p className={styles.funFactText}>
                {funFacts[currentFact]}
              </p>
            </div>
          </div>
          <div className={styles.profileSection}>
            <div className={styles.profilePhoto}>
              <img 
                src="/sahilImage.png" 
                alt="Sahil Walecha - Lead Frontend Developer" 
                className={styles.profileImage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Story Section */}
        <div className={`${styles.fadeIn} ${styles.storySection}`}>
          <div className={styles.storyCard}>
            <h2 className={styles.sectionTitle}>
              My Story 📖
            </h2>
            <div className={styles.storyContent}>
            <p>
                My journey started during my college years, where I first discovered the magic of turning ideas into interactive experiences. What began as curiosity about how websites work quickly evolved into a deep passion for crafting <em>exceptional user experiences</em> with React and modern JavaScript.
              </p>
              <p>
                From my early internships exploring diverse technologies to leading enterprise-level teams, I've had the privilege of working across various domains—from government systems to eCommerce platforms. Today, as a Staff Engineer, I architect scalable component libraries that power multiple applications, but the thrill of solving complex problems remains the same.
              </p>
              <p>
                When I'm not optimizing bundle sizes or debugging state management flows, you'll find me exploring the latest in React ecosystem, or mentoring developers who are just starting their journey. I believe that <strong>great code is not just functional—it's readable, maintainable, and tells a compelling story</strong> about the problem it solves.
              </p>
              <p>
                My approach to frontend development is deeply rooted in <strong>performance-first thinking</strong>, <strong>scalable architecture</strong>, and <strong>developer experience</strong>. Whether it's reducing load times by 25% with server-side rendering or building component libraries that cut development time by 40%, I strive to create solutions that don't just work—they make other developers' lives easier and more productive.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className={`${styles.fadeIn} ${styles.skillsSection}`}>
          <h2 className={styles.sectionTitle}>
            My Toolkit 🛠️
          </h2>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={styles.skillCard}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className={styles.skillHeader}>
                  <h3 className={styles.skillName}>{skill.name}</h3>
                  <span className={styles.skillLevel}>{skill.level}%</span>
                </div>
                <div className={styles.skillBarContainer}>
                  <div
                    className={styles.skillBar}
                    style={{
                      width: `${hoveredSkill === index ? skill.level : 0}%`,
                      backgroundColor: skill.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className={`${styles.fadeIn} ${styles.timelineSection}`}>
          <h2 className={styles.sectionTitle}>
            My Journey 🛤️
          </h2>
          <div className={styles.timelineContainer}>
            {timeline.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  {item.icon}
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <span className={styles.timelineYear}>
                      {item.year}
                    </span>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.timelineDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`${styles.fadeIn} ${styles.ctaSection}`}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>
              Let's Build Something Amazing Together! 🚀
            </h2>
            <p className={styles.ctaSubtitle}>
              Whether you need a scalable React application, performance optimization, or just want to chat about the latest in frontend development—I'd love to hear from you.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaButton} onClick={() => window.location.href = 'mailto:sahil.walecha24@gmail.com'}>
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSahilPage;