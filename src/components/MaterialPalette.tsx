import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MaterialPalette.css';
import seeshamImg from '../assets/seesham1.jpg';
import ironImg from '../assets/iron.jpg';
import mangoImg from '../assets/mangowood.jpg';

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    name: "Indian Sheesham",
    scientific: "Dalbergia Sissoo",
    desc: "Renowned for its golden-brown hues and unique grain patterns, our Sheesham is ethically sourced and seasoned for peak durability.",
    img: seeshamImg,
    properties: ["High Density", "Deep Grain", "Vriksh Certified"]
  },
  {
    name: "Hand-Forged Iron",
    scientific: "Industrial Grade",
    desc: "Every metal frame is fire-forged by our blacksmiths, combining raw industrial strength with a refined, artisanal finish.",
    img: ironImg,
    properties: ["Tensile Strength", "Rustic Patina", "Zero Corrosion"]
  },
  {
    name: "Natural Mango Wood",
    scientific: "Mangifera Indica",
    desc: "A sustainable alternative with a versatile palette, ranging from pale honey to dark streaks, perfect for modern silhouettes.",
    img: mangoImg,
    properties: ["Sustainable", "Versatile Texture", "Lightweight"]
  }
];

export const MaterialPalette: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mp-card', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.mp-grid',
          start: 'top 85%',
        }
      });

      gsap.from('.mp-header-content', {
        y: -30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.mp-section',
          start: 'top 90%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mp-section">
      <div className="mp-container">
        <header className="mp-header">
          <div className="mp-header-content">
            <span className="mp-eyebrow">The Foundation of Quality</span>
            <h2 className="mp-title">Material <em>Palette</em></h2>
            <div className="mp-divider" />
            <p className="mp-subtitle">
              We select only the finest raw materials, ensuring each piece of furniture
              is a testament to longevity and natural beauty.
            </p>
          </div>
        </header>

        <div className="mp-grid">
          {materials.map((mat, i) => (
            <div key={i} className="mp-card">
              <div className="mp-img-wrap">
                <img src={mat.img} alt={mat.name} className="mp-img" />
                <div className="mp-img-overlay" />
                <div className="mp-scientific">{mat.scientific}</div>
              </div>
              <div className="mp-info">
                <h3 className="mp-mat-name">{mat.name}</h3>
                <p className="mp-mat-desc">{mat.desc}</p>
                <div className="mp-properties">
                  {mat.properties.map((prop, pi) => (
                    <span key={pi} className="mp-prop-tag">{prop}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
