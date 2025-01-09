import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Portfolio.module.css';

const PortfolioItem: React.FC<{ title: string; description: string; image: string; link: string }> = ({ title, description, image, link }) => (
  <div className={styles.portfolioItem}>
    <img src={image} alt={title} />
    <div className={styles.overlay}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} className={styles.viewProject}>View Project</Link>
    </div>
  </div>
);

const Portfolio: React.FC = () => {
  const projects = [
    { title: 'Project 1', description: 'A brief description of the project', image: '/placeholder.svg', link: '/portfolio/project1' },
    { title: 'Project 2', description: 'Another project showcase', image: '/placeholder.svg', link: '/portfolio/project2' },
    { title: 'Project 3', description: 'Highlighting key features', image: '/placeholder.svg', link: '/portfolio/project3' },
  ];

  return (
    <section className={styles.portfolio}>
      <h2>Portfolio Showcase</h2>
      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <PortfolioItem key={index} {...project} />
        ))}
      </div>
      <Link to="/portfolio" className={styles.viewAllProjects}>View All Projects</Link>
    </section>
  );
};

export default Portfolio;

