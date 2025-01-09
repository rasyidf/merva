import React from 'react';
import styles from './Testimonials.module.css';

const TestimonialCard: React.FC<{ quote: string; author: string; role: string }> = ({ quote, author, role }) => (
  <div className={styles.testimonialCard}>
    <blockquote>{quote}</blockquote>
    <cite>
      <strong>{author}</strong>
      <span>{role}</span>
    </cite>
  </div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    { quote: "Merva has significantly accelerated our development process. It's a game-changer!", author: "Jane Doe", role: "CTO, Tech Innovators" },
    { quote: "The modular architecture of Merva allowed us to easily customize and extend our application.", author: "John Smith", role: "Lead Developer, StartUp Co." },
    { quote: "Using Merva as our boilerplate saved us months of setup and configuration time.", author: "Emily Brown", role: "Product Manager, SaaS Solutions" },
  ];

  return (
    <section className={styles.testimonials}>
      <h2>What People Are Saying</h2>
      <div className={styles.testimonialGrid}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

