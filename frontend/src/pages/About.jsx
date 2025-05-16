import { motion } from 'motion/react';
import { pageVariants, pageTransition } from '../utils/utils';

const About = () => {
  return (
    <>
      <motion.div
        className="about"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="about__header">
          <h1>Blockchain Education Initiative: Building Understanding, Fostering Confidence</h1>
        </div>
        <div className="about__content">
          <div className="about__content__block">
            <h2>About Us</h2>
            <p>
              At Blockchain Education Initiative, we believe that understanding blockchain technology and digital
              currencies shouldn't be limited to tech enthusiasts or financial experts. Our platform was created as part
              of the Student Web Developer of the Year competition 2025, with a mission to make these complex topics
              accessible to everyone.
            </p>
          </div>
          <div className="about__content__block">
            <h2>Why We're Here</h2>
            <p>
              The rise of digital currencies represents one of the most significant shifts in how we think about and use
              money. Whether it's cryptocurrencies making headlines or central banks developing their own digital
              currencies (CBDCs), these technologies are becoming increasingly relevant to our daily lives. Yet, many
              people feel overwhelmed by the technical jargon and complexity surrounding them.
            </p>
          </div>
          <div className="about__content__block">
            <h2>Our Approach</h2>
            <p>
              We've developed a hands-on learning experience that combines clear, straightforward explanations with
              practical exercises. Our simulated wallet feature lets you experience digital currency management in a
              risk-free environment, while our educational content breaks down complex concepts into digestible pieces.
            </p>
          </div>
          <div className="about__content__block">
            <h2>Educational Standards</h2>
            <div className="about__content__block__addition">
              <div className="about__content__block__addition__list">
                <p>Our content is carefully crafted to be:</p>
                <ul>
                  <li>Accurate and up-to-date</li>
                  <li>Free from technical jargon where possible</li>
                  <li>Politically neutral</li>
                  <li>Focused on education rather than investment advice</li>
                  <li>Accessible to all skill levels</li>
                </ul>
              </div>
              <img src="src/assets/images/checkmark.png" alt="Checkmark" />
            </div>
          </div>
          <div className="about__content__block">
            <h2>Commitment to Accessibility</h2>
            <p>
              We're committed to making digital currency education accessible to everyone, regardless of their technical
              background or physical abilities. Our platform follows WCAG 2.1 guidelines to ensure all users can access
              and benefit from our resources.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default About;
