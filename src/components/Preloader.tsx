import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const images = document.querySelectorAll('img');
        const totalImages = images.length;
        let loadedCount = 0;

        const updateProgress = () => {
            loadedCount++;
            const newProgress = Math.floor((loadedCount / totalImages) * 100);
            setProgress(newProgress);
            if (loadedCount >= totalImages) {
                setIsLoaded(true);
            }
        };

        if (totalImages === 0) {
            let p = 0;
            const interval = setInterval(() => {
                p += 10;
                setProgress(p);
                if (p >= 100) {
                    clearInterval(interval);
                    setIsLoaded(true);
                }
            }, 50);
        } else {
            images.forEach(img => {
                if (img.complete) {
                    updateProgress();
                } else {
                    img.addEventListener('load', updateProgress);
                    img.addEventListener('error', updateProgress);
                }
            });
        }
    }, []);

    const hasFinished = useRef(false);

    useEffect(() => {
        if (isLoaded && !hasFinished.current) {
            hasFinished.current = true;
            const tl = gsap.timeline();
            
            tl.to('.preloader-bar-fill', {
                width: '100%',
                duration: 0.5,
                ease: 'power4.out'
            })
            .to('.preloader-wrapper', {
                yPercent: -100,
                duration: 1.4,
                ease: 'expo.inOut',
                delay: 0.1,
                onStart: () => {
                   // Reveal site underneath as preloader slides up
                   gsap.fromTo('.main-container', 
                       { y: 50, opacity: 0 },
                       { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out' }
                   );
                },
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            })
            .set('.preloader-wrapper', { display: 'none' });
        }
    }, [isLoaded, onComplete]);

    return (
        <div className="preloader-wrapper">
            <div className="preloader-overlay" />
            
            <div className="preloader-content">
                <div className="preloader-logo">
                    VISHWAKARMA
                </div>
                
                <div className="preloader-bar">
                    <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
                </div>
                
                <div className="percent-container">
                    <div className="preloader-percent">
                        {progress < 100 ? `Crafting Excellence ${progress}%` : "Ready to Discover"}
                    </div>
                </div>
            </div>

            <style>{`
                .preloader-wrapper {
                    position: fixed;
                    inset: 0;
                    z-index: 1000000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background-color: #1a1a1a;
                }
                .preloader-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #0c0c0c;
                    z-index: -1;
                }
                .preloader-content {
                    text-align: center;
                    color: #fff;
                    z-index: 1;
                    width: 100%;
                    padding: 0 1.5rem;
                }
                .preloader-logo {
                    font-family: var(--font-display);
                    font-size: clamp(1.2rem, 7vw, 2.5rem);
                    letter-spacing: 0.4em;
                    font-weight: 300;
                    margin-bottom: 2.5rem;
                    width: 100%;
                    text-align: center;
                }
                .preloader-bar {
                    width: 80%;
                    max-width: 300px;
                    height: 1px;
                    background: rgba(255,255,255,0.05);
                    position: relative;
                    margin: 0 auto;
                }
                .preloader-bar-fill {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background-color: var(--gold-primary);
                    transition: width 0.4s cubic-bezier(0.1, 0, 0, 1);
                }
                .percent-container {
                    overflow: hidden;
                    marginTop: 1.5rem;
                }
                .preloader-percent {
                    font-family: var(--font-body);
                    font-size: 0.6rem;
                    letter-spacing: 0.3em;
                    opacity: 0.6;
                    text-transform: uppercase;
                    margin-top: 1.5rem;
                }
                @media (max-width: 480px) {
                    .preloader-logo {
                        letter-spacing: 0.3em;
                        margin-bottom: 2rem;
                    }
                    .preloader-bar {
                        max-width: 240px;
                    }
                }
            `}</style>
        </div>
    );
};
