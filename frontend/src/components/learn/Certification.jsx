import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = ({ fullName }) => (
  <div className="learn__certificate">
    <div className="learn__certificate__content">
      <h1>Certificate of Completion</h1>
      <h2>Blockchain & Digital Asset Fundamentals</h2>
      <p>Presented to:</p>
      <h3>{fullName || 'Your Name'}</h3>
      <p>Date: {new Date().toLocaleDateString()}</p>
      <div className="learn__certificate__footer">
        For successfully completing the course on blockchain technology and digital assets.
      </div>
      <img src="src/assets/images/trophy.png" alt="Trophy" />
    </div>
  </div>
);

const Certification = ({ handleOpen, setSessionId, setIsPassed }) => {
  const [fullName, setFullName] = useState('');
  const certificateRef = useRef(null);

  const generatePDF = async () => {
    if (!certificateRef.current) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: true,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${fullName}_Certificate.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName) {
      generatePDF();
    }
  };

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
          <form className="learn__certification__content__form" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name for Certificate:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
            <p className="learn__certification__content__form__disclaimer">
              Please note that this certificate is for personal use only and does not confer any official accreditation
              or qualification.
            </p>
            <button type="submit">Generate My Certificate</button>
          </form>
        </div>
      </div>
      <div className="certificate-container" ref={certificateRef}>
        <Certificate fullName={fullName} />
      </div>
    </>
  );
};

export default Certification;
