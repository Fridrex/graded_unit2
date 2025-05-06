import { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Certification = ({ handleOpen, setSessionId, setIsPassed }) => {
  return (
    <>
      <div className="learn__certification">
        <button className="learn__back-button" onClick={() => handleOpen('blockchain')}>
          Back to Learn page
        </button>
        <div className="learn__certification__content">
          <h1>Congratulations on Your Achievement!</h1>
          <h3>Your Certificate of Completion: Blockchain & Digital Asset Fundamentals</h3>
          <img src="src/assets/images/certification.png" alt="Certificate" />
          <p>
            You have successfully demonstrated your understanding of the core concepts of Blockchain technology,
            Cryptocurrencies, and Central Bank Digital Currencies presented in this educational portal. This certificate
            formally recognises your dedication and learning.
          </p>
          <p>
            To personalise your official certificate, please enter your full name as you would like it to appear, then
            click the button below.
          </p>
          <form className="learn__certification__content__form">
            <label for="fullName">Full Name for Certificate:</label>
            <input type="text" id="fullName" name="fullName" placeholder="e.g., Jane Emily Doe" />
            <button type="submit">Generate My Certificate</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Certification;
