import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ScrollingBanner.css';

export const ScrollingBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bannerItem = bannerRef.current?.querySelector('.banner-track');
      if (bannerItem) {
        gsap.to(bannerItem, {
          x: '-50%',
          duration: 60, // Much slower, silent luxury pace
          repeat: -1,
          ease: 'none',
        });
      }
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={bannerRef} className="scrolling-banner-container">
      <div className="banner-track">
        <div className="banner-content">
          <span>LEGACY OF JODHPUR</span>
          <span>CRAFTING THE FUTURE</span>
          <span>ESTABLISHED 2001</span>
          <span>WORLDWIDE EXPORTS</span>
          <span>ARCHITECTURAL PRECISION</span>
        </div>
        <div className="banner-content">
          <span>LEGACY OF JODHPUR</span>
          <span>CRAFTING THE FUTURE</span>
          <span>ESTABLISHED 2001</span>
          <span>WORLDWIDE EXPORTS</span>
          <span>ARCHITECTURAL PRECISION</span>
        </div>
      </div>
    </div>
  );
};
