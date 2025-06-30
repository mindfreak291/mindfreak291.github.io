import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import styles from './ExperiencePage.module.css';

interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  company: string;
  location: string;
  description: string[];
  technologies: string[];
  isActive: boolean;
}

const ExperiencePage: NextPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const experiences: ExperienceItem[] = [
    {
      id: 'nagarro',
      period: 'January 2021 - Present',
      title: 'Staff Engineer',
      company: 'Nagarro',
      location: 'Monterrey, Nuevo León',
      description: [
        'Architected a scalable, modular React component library adopted across multiple enterprise applications, reducing UI development time by 40% and enabling consistent UX patterns',
        'Optimized rendering performance in React applications through strategic use of memoization and virtual DOM insights, enhancing runtime efficiency and user experience',
        'Implemented server-side rendering with Next.js, reducing initial load times by 25% and significantly improving SEO for high-traffic public-facing pages',
        'Developed and maintained custom React hooks to encapsulate shared business logic, improving code reusability and reducing duplication across teams',
        'Led the migration from class-based to functional React components with Hooks, improving maintainability and reducing defects by 35%',
        'Directed the architecture of a dual-channel (B2B & B2C) eCommerce platform using Magento Commerce Cloud, resulting in a 20% increase in conversion rates',
        'Engineered complex asynchronous data flows from multiple REST APIs using Redux middleware and advanced action orchestration',
        'Mentored and coached junior and mid-level developers, increasing overall team delivery velocity by 25% and promoting best practices'
      ],
      technologies: ['React', 'Next.js', 'Redux', 'TypeScript', 'Magento', 'REST APIs', 'SSR', 'Component Libraries'],
      isActive: true
    },
    {
      id: 'itwings',
      period: 'September 2019 - December 2020',
      title: 'Team Lead / Programmer',
      company: 'ITWINGS INFOSYSTEM PRIVATE LIMITED',
      location: 'Gurugram, Haryana',
      description: [
        'Managed Agile development of government sector projects for GMDA',
        'Architected Vehicle Challan system using React.js and Redux for state management',
        'Developed offline-first capabilities using service workers and IndexedDB',
        'Implemented responsive UI with CSS Grid and Flexbox for cross-device compatibility',
        'Created reusable React components for the sports application tracking system',
        'Utilized React Context API for theming and global state management'
      ],
      technologies: ['React.js', 'Redux', 'Service Workers', 'IndexedDB', 'CSS Grid', 'Context API', 'Agile'],
      isActive: false
    },
    {
      id: 'rico',
      period: 'May 2018 - February 2019',
      title: 'Software Developer',
      company: 'RICO AUTO INDUSTRIES LTD.',
      location: 'Gurugram, Haryana',
      description: [
        'Built responsive web interfaces using modern CSS frameworks',
        'Implemented cross-browser compatible solutions addressing specific browser quirks',
        'Developed interactive UI elements with vanilla JavaScript and ES6 features',
        'Utilized BEM methodology for maintainable CSS architecture',
        'Improved software efficiency by troubleshooting and resolving coding issues',
        'Saved time and resources by identifying and fixing bugs before product deployment'
      ],
      technologies: ['JavaScript', 'ES6', 'CSS3', 'BEM', 'Responsive Design', 'Cross-browser Testing'],
      isActive: false
    },
    {
      id: 'globus',
      period: 'January 2018 - March 2018',
      title: 'Specialist Software',
      company: 'GLOBUS EIGHT INC',
      location: 'Gurgaon, Haryana',
      description: [
        'Developed Android application for IoT device control using Java',
        'Created RESTful API client for device communication',
        'Implemented gesture recognition using Android sensor APIs',
        'Collaborated with cross-functional teams to achieve project goals on time and within budget'
      ],
      technologies: ['Android', 'Java', 'REST APIs', 'IoT', 'Sensor APIs'],
      isActive: false
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentExperience = experiences[activeTab];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.experienceContainer}>
        <div className={`${styles.headerSection} ${isVisible ? styles.visible : ''}`}>
          <h1 className={styles.pageTitle}>
            <span className={styles.titleNumber}>01.</span>
            Where I've Worked
          </h1>
        </div>

        <div className={`${styles.experienceContent} ${isVisible ? styles.visible : ''}`}
             style={{ '--active-tab': activeTab } as React.CSSProperties}>
          {/* Tab Navigation */}
          <div className={styles.tabList} role="tablist">
            {experiences.map((exp, index) => (
              <button
                key={exp.id}
                className={`${styles.tabButton} ${activeTab === index ? styles.active : ''}`}
                onClick={() => setActiveTab(index)}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`panel-${exp.id}`}
              >
                {exp.company}
              </button>
            ))}
            <div className={styles.tabIndicator} />
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            <div
              id={`panel-${currentExperience.id}`}
              role="tabpanel"
              className={styles.tabPanel}
            >
              <h3 className={styles.jobTitle}>
                {currentExperience.title}
                <span className={styles.company}>
                  {' @ '}
                  <span className={styles.companyName}>
                    {currentExperience.company}
                  </span>
                </span>
              </h3>
              
              <p className={styles.jobPeriod}>
                {currentExperience.period}
              </p>
              
              <p className={styles.jobLocation}>
                📍 {currentExperience.location}
              </p>

              <ul className={styles.jobDescription}>
                {currentExperience.description.map((item, index) => (
                  <li key={index} className={styles.descriptionItem}>
                    {item}
                  </li>
                ))}
              </ul>

              <div className={styles.technologies}>
                <h4 className={styles.techTitle}>Technologies Used:</h4>
                <ul className={styles.techList}>
                  {currentExperience.technologies.map((tech, index) => (
                    <li key={index} className={styles.techItem}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div className={`${styles.skillsSection} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.skillsTitle}>
            <span className={styles.titleNumber}>02.</span>
            Technical Skills
          </h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCategory}>
              <h3>Frontend</h3>
              <p>React, Next.js, Redux, TypeScript, HTML5, CSS3, JavaScript ES6+</p>
            </div>
            <div className={styles.skillCategory}>
              <h3>Tools & Workflow</h3>
              <p>Git, GitHub Actions, Jenkins, Webpack, Vite, ESLint, Jest</p>
            </div>
            <div className={styles.skillCategory}>
              <h3>Performance</h3>
              <p>SSR, Code Splitting, Lazy Loading, Lighthouse Optimization</p>
            </div>
            <div className={styles.skillCategory}>
              <h3>Architecture</h3>
              <p>Component Libraries, Design Systems, REST APIs, Responsive Design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;