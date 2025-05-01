import { useState, useEffect } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className={visible ? 'back-to-top' : 'hide'} onClick={scrollToTop}>
      <span>↑</span>
    </div>
  );
};

export default BackToTop;
