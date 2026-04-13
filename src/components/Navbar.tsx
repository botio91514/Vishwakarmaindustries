import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navRef = useRef<HTMLElement>(null);

    const navItems = [
        { path: '/', label: 'Home', number: '01' },
        { path: '/products', label: 'Collections', number: '02' },
        { path: '/about', label: 'Atelier', number: '03' },
        { path: '/contact', label: 'Contact', number: '04' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // 1. Determine direction for hide/show logic
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
                setIsVisible(false); // Scrolling down - hide
            } else {
                setIsVisible(true); // Scrolling up - show
            }

            // 2. Track scrolled state for transparency
            setIsScrolled(currentScrollY > 100);

            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo('.menu-item-luxe',
                { y: 100, opacity: 0, rotateX: -45 },
                { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
            );
            gsap.fromTo('.menu-number',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const handleNavClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Main Navbar */}
            <nav
                ref={navRef}
                className={`navbar-luxe ${isScrolled ? 'scrolled' : ''} ${!isVisible ? 'nav-hidden' : ''}`}
            >
                {/* Logo with animated underline */}
                <Link to="/" className="nav-logo interactive magnetic">
                    <span className="logo-text">VISHWAKARMA</span>
                    <span className="logo-line" />
                </Link>

                {/* Right Side - CTA & Menu Toggle */}
                <div className="nav-right">
                    <Link to="/contact" className="nav-cta interactive magnetic">
                        <span>Contact Us</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>

                    <button className="menu-toggle interactive magnetic" onClick={() => setIsOpen(true)}>
                        <div className="hamburger">
                            <span />
                            <span />
                        </div>
                        <span className="menu-label">Menu</span>
                    </button>
                </div>
            </nav>

            {/* Full Screen Menu Overlay */}
            <div className={`menu-overlay-luxe ${isOpen ? 'open' : ''}`}>
                {/* Animated Background */}
                <div className="menu-bg">
                    <div className="menu-bg-shape" />
                    <div className="menu-bg-shape" />
                    <div className="menu-bg-shape" />
                </div>

                {/* Close Button */}
                <button className="menu-close interactive" onClick={() => setIsOpen(false)}>
                    <span className="close-line" />
                    <span className="close-line" />
                    <span className="close-label">Close</span>
                </button>

                {/* Menu Content */}
                <div className="menu-container">
                    <div className="menu-left">
                        <span className="menu-eyebrow">Navigation</span>
                    </div>

                    <nav className="menu-nav">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="menu-item-luxe interactive"
                                onClick={handleNavClick}
                            >
                                <span className="menu-number">{item.number}</span>
                                <span className="menu-text">{item.label}</span>
                                <span className="menu-arrow">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path d="M8 16H24M24 16L16 8M24 16L16 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className="menu-right">
                        <div className="menu-info">
                            <span className="info-label">Get in Touch</span>
                            <a href="mailto:hello@vishwakarma.com" className="info-link interactive">hello@vishwakarma.com</a>
                            <a href="tel:+15551234567" className="info-link interactive">+1 (555) 123-4567</a>
                        </div>
                        <div className="menu-social">
                            <span className="info-label">Follow Us</span>
                            <div className="social-links">
                                <a href="#" className="social-link interactive">Instagram</a>
                                <a href="#" className="social-link interactive">Pinterest</a>
                                <a href="#" className="social-link interactive">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="menu-bottom">
                    <span className="bottom-text">Est. 1985</span>
                    <span className="bottom-line" />
                    <span className="bottom-text">Luxury Furniture</span>
                </div>
            </div>
        </>
    );
};
