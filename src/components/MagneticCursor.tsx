import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // if (window.matchMedia('(pointer: coarse)').matches) return; // Support touch-capable hybrid laptops

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Movement listener
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Ticker loop
    const onTick = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

      gsap.set(cursor, {
        x: cursorPos.current.x,
        y: cursorPos.current.y,
        xPercent: -50,
        yPercent: -50
      });
      gsap.set(dot, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        xPercent: -50,
        yPercent: -50
      });

      trailRefs.current.forEach((trail, i) => {
        if (trail) {
          gsap.set(trail, {
            x: cursorPos.current.x,
            y: cursorPos.current.y,
            xPercent: -50,
            yPercent: -50,
            opacity: 0.1,
            scale: 0.8 - i * 0.1
          });
        }
      });
    };

    // Delegation
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.magnetic, .interactive, a, button');
      if (target) {
        cursor.classList.add('hover');
        if (target.classList.contains('magnetic')) {
          const rect = target.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          gsap.to(target, {
            x: (e.clientX - centerX) * 0.35,
            y: (e.clientY - centerY) * 0.35,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      } else {
        cursor.classList.remove('hover');
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.magnetic');
      if (target) {
        gsap.to(target, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      }
      cursor.classList.remove('hover');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    gsap.ticker.add(onTick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      gsap.ticker.remove(onTick);
    };
  }, []);

  // Don't render on touch devices
  // if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
  //   return null;
  // }

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={dotRef} className="cursor-dot" />
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="cursor-trail"
          style={{ opacity: 0.15, background: 'white' }}
        />
      ))}
    </>
  );
};
