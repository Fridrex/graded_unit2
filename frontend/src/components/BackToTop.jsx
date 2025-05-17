/**
 * @file BackToTop.jsx
 * @description A component that displays a "Back to Top" button
 * when the user scrolls down a certain amount on the page.
 * Clicking the button smoothly scrolls the page to the top.
 */

import { useState, useEffect } from 'react';

/**
 * @function BackToTop
 * @description A button component that appears on scroll and allows users to quickly return to the top of the page.
 * @returns {JSX.Element | null} The BackToTop button UI or null if not visible.
 */
const BackToTop = () => {
  // State to control the visibility of the button
  const [visible, setVisible] = useState(false);

  // useEffect to add and remove scroll event listener
  useEffect(() => {
    /**
     * @function handleScroll
     * @description Checks the window's scroll position.
     * Sets the button to visible if scrolled more than 500 pixels, otherwise hides it.
     */
    const handleScroll = () => {
      if (window.scrollY > 500) {
        // Show button if scrolled more than 500px
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleanup on unmount

  /**
   * @function scrollToTop
   * @description Smoothly scrolls the window to the top of the page.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth' // This was commented out in the original; uncomment for smooth scroll
    });
  };

  return (
    // Conditionally render the button based on the 'visible' state
    // Applies 'hide' class if not visible, otherwise 'back-to-top'
    <div className={visible ? 'back-to-top' : 'hide'} onClick={scrollToTop}>
      <span>↑</span> {/* Up arrow icon */}
    </div>
  );
};

export default BackToTop;
