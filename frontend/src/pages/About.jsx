/**
 * @file About.jsx
 * @description Component for the 'About' page of the Blockchain Education Initiative.
 * Provides information about the platform's mission, approach, educational standards,
 * and commitment to accessibility.
 */

import { motion } from 'motion/react'; // For page transition animations
import { pageVariants, pageTransition } from '../utils/utils'; // Animation utility constants
import checkmark from '../../src/assets/images/checkmark.png'; // Checkmark image for visual representation

/**
 * @function About
 * @description The main component for the About page.
 * Displays static content related to the project's background and goals.
 * @returns {JSX.Element} The About page UI.
 */
const About = () => {
  return (
    <>
      {/* Animated div for page transitions */}
      <motion.div
        className="about"
        initial="initial" // Initial animation state
        animate="in" // Animation state when component is in view
        exit="out" // Animation state when component is exiting
        variants={pageVariants} // Predefined animation variants
        transition={pageTransition} // Predefined animation transition settings
      >
        {/* Header section of the About page */}
        <div className="about__header">
          <h1>Blockchain Education Initiative: Building Understanding, Fostering Confidence</h1>
        </div>

        {/* Main content section of the About page */}
        <div className="about__content">
          {/* Block explaining who "we" are */}
          <div className="about__content__block">
            <h2>About Us</h2>
            <p>
              At Blockchain Education Initiative, we believe that understanding blockchain technology and digital
              currencies shouldn't be limited to tech enthusiasts or financial experts. Our platform was created as part
              of the Student Web Developer of the Year competition 2025, with a mission to make these complex topics
              accessible to everyone.
            </p>
          </div>

          {/* Block explaining the motivation behind the platform */}
          <div className="about__content__block">
            <h2>Why We're Here</h2>
            <p>
              The rise of digital currencies represents one of the most significant shifts in how we think about and use
              money. Whether it's cryptocurrencies making headlines or central banks developing their own digital
              currencies (CBDCs), these technologies are becoming increasingly relevant to our daily lives. Yet, many
              people feel overwhelmed by the technical jargon and complexity surrounding them.
            </p>
          </div>

          {/* Block explaining the educational approach */}
          <div className="about__content__block">
            <h2>Our Approach</h2>
            <p>
              We've developed a hands-on learning experience that combines clear, straightforward explanations with
              practical exercises. Our simulated wallet feature lets you experience digital currency management in a
              risk-free environment, while our educational content breaks down complex concepts into digestible pieces.
            </p>
          </div>

          {/* Block detailing the educational standards */}
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
              {/* Decorative image */}
              <img src={checkmark} alt="Checkmark" />
            </div>
          </div>

          {/* Block highlighting commitment to accessibility */}
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
