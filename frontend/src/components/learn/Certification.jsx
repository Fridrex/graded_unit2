/**
 * @file Certification.jsx
 * @description Component that allows users to generate a personalized Certificate of Completion
 * after successfully finishing all learning modules. Uses html2canvas and jsPDF to create a downloadable PDF.
 */

import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas'; // For capturing an HTML element as a canvas
import jsPDF from 'jspdf'; // For generating PDF documents
import { motion } from 'motion/react'; // For page transition animations
import { pageVariants, pageTransition } from '../../utils/utils'; // Animation utility constants
import Loading from '../Loading'; // Loading spinner component

/**
 * @function Certificate
 * @description A stateless component that renders the visual layout of the certificate.
 * This component's content will be captured to generate the PDF.
 * @param {object} props - Component props.
 * @param {string} props.fullName - The full name of the user to be displayed on the certificate.
 * @returns {JSX.Element} The certificate layout.
 */
const Certificate = ({ fullName }) => (
  // This div is what will be converted to an image, then PDF
  <div className="learn__certificate">
    <div className="learn__certificate__content">
      <h1>Certificate of Completion</h1>
      <h2>Blockchain & Digital Asset Fundamentals</h2>
      <p>Presented to:</p>
      <h3>{fullName || 'Your Name'}</h3> {/* Displays placeholder if name not yet entered */}
      <p>Date: {new Date().toLocaleDateString()}</p> {/* Current date */}
      <div className="learn__certificate__footer">
        For successfully completing the course on blockchain technology and digital assets.
      </div>
      <img src="src/assets/images/trophy.png" alt="Trophy icon" /> {/* Decorative image */}
    </div>
  </div>
);

/**
 * @function Certification
 * @description Main component for the Certification page.
 * Allows users to enter their full name and generate a PDF certificate.
 * @param {object} props - Component props.
 * @param {function} props.handleOpen - Function passed from the parent (Learn.jsx)
 * to signal that this module should be closed, returning the user to the main Learn page.
 * @returns {JSX.Element} The Certification page UI.
 */
const Certification = ({ handleOpen }) => {
  // State to store the user's full name for the certificate
  const [fullName, setFullName] = useState('');
  // Ref to access the DOM element of the Certificate component for PDF generation
  const certificateRef = useRef(null);
  // State to manage the loading indicator during PDF generation
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @function generatePDF
   * @description Captures the Certificate component as an image using html2canvas,
   * then converts this image into a PDF document using jsPDF and triggers a download.
   */
  const generatePDF = async () => {
    // Ensure the certificate element is available
    if (!certificateRef.current) return;

    try {
      setIsLoading(true); // Show loading spinner

      // Capture the certificate element as a canvas
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Increase scale for better resolution in PDF
        logging: true, // Enable logging for debugging html2canvas
        useCORS: true, // Enable CORS if images are from external sources (though local here)
        backgroundColor: '#ffffff', // Set a white background for the captured image
      });

      const imgData = canvas.toDataURL('image/png'); // Convert canvas to PNG image data URL
      const pdf = new jsPDF({
        orientation: 'landscape', // PDF orientation
        unit: 'mm', // Units for PDF dimensions
        format: 'a4', // PDF page size
      });

      // Calculate image dimensions to fit A4 landscape
      const imgWidth = 297; // A4 width in mm (landscape)
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // Add image to PDF
      pdf.save(`${fullName || 'User'}_Certificate.pdf`); // Trigger download with a dynamic filename
      setIsLoading(false); // Hide loading spinner
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsLoading(false); // Hide loading spinner on error
      // Optionally, display an error message to the user
    }
  };

  /**
   * @function handleSubmit
   * @description Handles the form submission for generating the certificate.
   * Prevents default form action and calls generatePDF if a full name is provided.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (fullName) {
      // Proceed only if a name is entered
      generatePDF();
    }
    // Else, the 'required' attribute on input should prevent submission without a name
  };

  // Display loading spinner if PDF generation is in progress
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Animated container for the certification section */}
      <motion.div
        className="learn__certification"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {/* Button to go back to the main Learn page */}
        <button className="learn__back-button" onClick={() => handleOpen('certification')}>
          Back to Learn page
        </button>
        <div className="learn__certification__content">
          <h1>Congratulations on Your Achievement!</h1>
          <h3>Your Certificate of Completion: Blockchain & Digital Asset Fundamentals</h3>
          <img src="src/assets/images/certification.png" alt="Illustration for Certification" />
          <p>
            You have successfully demonstrated your understanding of the core concepts of Blockchain technology,
            Cryptocurrencies, and Central Bank Digital Currencies presented in this educational portal. This certificate
            formally recognises your dedication and learning.
          </p>
          <p>
            To personalise your official certificate, please enter your full name as you would like it to appear, then
            click the button below.
          </p>
          {/* Form to enter full name for the certificate */}
          <form className="learn__certification__content__form" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name for Certificate:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required // HTML5 validation for required field
            />
            <p className="learn__certification__content__form__disclaimer">
              Please note that this certificate is for personal use only and does not confer any official accreditation
              or qualification.
            </p>
            <button type="submit">Generate My Certificate</button>
          </form>
        </div>
      </motion.div>
      {/* Hidden container for the Certificate component that will be captured for PDF.
          It's positioned off-screen or hidden via CSS so it doesn't interfere with the layout,
          but is still renderable by html2canvas.
      */}
      <div
        className="certificate-container"
        ref={certificateRef}
        style={{ position: 'fixed', left: '-9999px', top: '-9999px' }}
      >
        <Certificate fullName={fullName} />
      </div>
    </>
  );
};

export default Certification;
