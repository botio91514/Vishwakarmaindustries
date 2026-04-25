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
          <span>VISHWAKARMA INDUSTRIES JODHPUR</span>
          <span>ARTISANAL HANDCRAFTED FURNITURE</span>
          <span>GLOBAL EXPORTS SINCE 1994</span>
          <span>INDUSTRIAL & CONTEMPORARY DESIGNS</span>
          <span>BORN IN THE BLUE CITY</span>
          <span>SUSTAINABLE VRIKSH CERTIFIED WOOD</span>
          <span>PREMIUM QUALITY MANUFACTURING</span>
          <span>JODHPUR'S HERITAGE TO THE WORLD</span>
        </div>
        <div className="banner-content">
          <span>VISHWAKARMA INDUSTRIES JODHPUR</span>
          <span>ARTISANAL HANDCRAFTED FURNITURE</span>
          <span>GLOBAL EXPORTS SINCE 1994</span>
          <span>INDUSTRIAL & CONTEMPORARY DESIGNS</span>
          <span>BORN IN THE BLUE CITY</span>
          <span>SUSTAINABLE VRIKSH CERTIFIED WOOD</span>
          <span>PREMIUM QUALITY MANUFACTURING</span>
          <span>JODHPUR'S HERITAGE TO THE WORLD</span>
        </div>
      </div>
    </div>
  );
};
