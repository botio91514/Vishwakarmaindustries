import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const ctx = gsap.context(() => {
         // 1. Title Entrance (Split Reveal)
         gsap.from('.contact-title span', {
            y: '100%',
            stagger: 0.1,
            duration: 1.5,
            ease: 'expo.out',
            delay: 0.5
         });

         // 2. Info Blocks Entrance
         gsap.from('.info-block', {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
               trigger: '.contact-grid',
               start: 'top 80%'
            }
         });

         // 3. Form Group Entrance
         gsap.from('.form-group', {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
               trigger: '.contact-form',
               start: 'top 85%'
            }
         });

         // 4. Submit Button Entrance
         gsap.from('.contact-submit', {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
               trigger: '.contact-submit',
               start: 'top 95%'
            }
         });

      }, containerRef);

      return () => ctx.revert();
   }, []);

   return (
      <div ref={containerRef} className="contact-page">
         <Navbar />

         <main>
            {/* Contact Hero */}
            <section className="contact-hero">
               <h1 className="contact-title">
                  <span>Let's <em>Begin</em></span>
                  <span>The Private</span>
                  <span>Consultation</span>
               </h1>
            </section>

            {/* Contact Layout */}
            <div className="contact-grid">
               {/* Left - Contact Details */}
               <div className="contact-info">
                  <div className="info-block">
                     <span className="info-label">— THE ATELIER —</span>
                     <a href="tel:+911234567890" className="info-value magnetic">+91 (291) 234-5678</a>
                     <a href="mailto:inquiry@vishwakarma.com" className="info-value magnetic">inquiry@vishwakarma.com</a>
                  </div>

                  <div className="info-block">
                     <span className="info-label">— LOCATION —</span>
                     <p className="info-value">H-1/256, ITI Area,<br />Jodhpur, Rajasthan 342001<br />INDIA</p>
                  </div>

                  <div className="info-block">
                     <span className="info-label">— SOCIAL —</span>
                     <div className="social-links-minimal">
                        <a href="#" className="magnetic">Instagram</a>
                        <a href="#" className="magnetic">LinkedIn</a>
                        <a href="#" className="magnetic">Pinterest</a>
                     </div>
                  </div>
               </div>

               {/* Right - Inquiry Form */}
               <div className="contact-form-container">
                  <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                     <div className="form-group">
                        <input type="text" className="form-input" id="name" placeholder="Name" />
                        <label htmlFor="name" className="form-label">Full Name</label>
                     </div>

                     <div className="form-group">
                        <input type="email" className="form-input" id="email" placeholder="Email" />
                        <label htmlFor="email" className="form-label">Private Email</label>
                     </div>

                     <div className="form-group">
                        <textarea className="form-input" id="project" placeholder="Briefly describe your vision..." style={{ resize: 'none', height: '120px' }} />
                        <label htmlFor="project" className="form-label">The Project</label>
                     </div>

                     <button className="contact-submit magnetic">
                        <span>Send Private Inquiry</span>
                     </button>
                  </form>
               </div>
            </div>
         </main>

         <Footer />
      </div>
   );
}

