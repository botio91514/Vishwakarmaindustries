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
        <div className="preloader-wrapper" style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#000'
        }}>
            <div className="preloader-overlay" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--text-primary)',
                zIndex: -1
            }} />
            
            <div className="preloader-content" style={{
                textAlign: 'center',
                color: 'var(--bg-secondary)',
                zIndex: 1
            }}>
                <div className="preloader-logo" style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    letterSpacing: '0.5em',
                    fontWeight: 300,
                    marginBottom: '3rem',
                    overflow: 'hidden'
                }}>
                    VISHWAKARMA
                </div>
                
                <div className="preloader-bar" style={{
                    width: '350px',
                    height: '1px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    position: 'relative',
                    margin: '0 auto'
                }}>
                    <div className="preloader-bar-fill" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${progress}%`,
                        backgroundColor: 'var(--gold-primary)',
                        transition: 'width 0.4s cubic-bezier(0.1, 0, 0, 1)'
                    }} />
                </div>
                
                <div className="percent-container" style={{
                   overflow: 'hidden',
                   marginTop: '1.5rem'
                }}>
                    <div className="preloader-percent" style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.3em',
                        opacity: 0.6,
                        textTransform: 'uppercase'
                    }}>
                        {progress < 100 ? `Crafting Excellence ${progress}%` : "Ready to Discover"}
                    </div>
                </div>
            </div>
        </div>
    );
};
