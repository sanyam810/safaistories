'use client';
import React, { useLayoutEffect, useRef ,useEffect} from 'react'
import styles from './style.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Index() {

    const background = useRef(null);
    const introImage = useRef(null);
    const txt = useRef(null);

    useEffect(() => {


        if(window.innerWidth < 768){
            gsap.fromTo(introImage.current, 
                { bottom: '-1000px',filter: 'grayscale(100%)' }, // Starting position (off-screen below)
                { 
                    bottom: '-110%', // End position (center vertically)
                    duration: 4, // Duration of the animation
                    ease: 'power4.inOut', // Easing function
                }
            );
        }

        if(window.innerWidth > 768){
            gsap.fromTo(introImage.current, 
                { bottom: '-600px',filter: 'grayscale(100%)' }, // Starting position (off-screen below)
                { 
                    bottom: '-110%', // End position (center vertically)
                    duration: 1.5, // Duration of the animation
                    ease: 'power4.inOut', // Easing function
                }
            );
        }

        
        
        const text = txt.current;
        gsap.fromTo(    
            text,
            { opacity: 1 }, // Start from being visible
            {
                opacity: 0, // Fade out
                duration: 1, // Duration of the fade-out animation
                onComplete: () => {
                    // After the fade-out, trigger the fade-in animation
                    gsap.to(text, {
                        opacity: 1, // Fade in
                        duration: 1, // Duration of the fade-in animation
                        delay: 1, // Delay before fading in
                    });
                },
            }
        );
        
        if(window.innerWidth < 768){
            gsap.from(background.current, {
                y: '100vh', // Start from below the viewport
                // yoyo: true, // Reverses the animation
                duration: 0.1, // Duration of the animation
                ease: 'power2.inOut', // Easing function for smoother animation
                delay: 0.4, // Delay before the animation starts
                onComplete: () => {
                    gsap.to(background.current, {
                        y: '0%', // Move to the center vertically
                        duration: 2.7, // Duration of the centering animation
                        ease: 'power4.inOut', // Easing function
                        onComplete: () => {
                            gsap.to(introImage.current, {
                                // width: '100vw', // Expand width to full viewport width
                                // height: '100vh',
                                // bottom: '-180%', // Expand height to full viewport height
                                duration: 1.5, // Duration of the expansion animation
                                ease: 'power4.inOut',
                                filter: 'grayscale(0%)', // Easing function
                                onComplete: () => {
                                    gsap.to(background.current, {
                                        opacity: 0,
                                        duration: 1,
                                        ease: 'power2.inOut',
                                    });
                                },
                            });
                        }
                    });
                },
            });
        }

        if(window.innerWidth > 768){
            gsap.from(background.current, {
                y: '100vh', // Start from below the viewport
                // yoyo: true, // Reverses the animation
                duration: 0.1, // Duration of the animation
                ease: 'power2.inOut', // Easing function for smoother animation
                delay: 0.4, // Delay before the animation starts
                onComplete: () => {
                    gsap.to(background.current, {
                        y: '0%', // Move to the center vertically
                        duration: 2, // Duration of the centering animation
                        ease: 'power4.inOut', // Easing function
                        onComplete: () => {
                            gsap.to(introImage.current, {
                                width: '100vw', // Expand width to full viewport width
                                height: '100vh',
                                bottom: '-180%', // Expand height to full viewport height
                                duration: 1.5, // Duration of the expansion animation
                                ease: 'power4.inOut',
                                filter: 'grayscale(0%)', // Easing function
                            });
                        }
                    });
                },
            });
        }
        
    }, []);
    

    // useLayoutEffect( () => {
    //     gsap.registerPlugin(ScrollTrigger);

    //     const timeline = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: document.documentElement,
    //             scrub: true,
    //             start: "top",
    //             end: "+=500px",
    //         },
    //     })

    //     timeline
    //         .from(background.current, {clipPath: `inset(15%)`})
    //         .to(introImage.current, {height: "200px"}, 0)
    // }, [])

    return (
        <div className={`${styles.homeHeader} pb-96`}>
            <div className={styles.backgroundImage} ref={background}>
                <Image 
                    src={'/images/b.jpg'}
                    fill={true}
                    alt="background image"
                    priority={true}
                />
            </div>
            <div className={styles.intro}>
                    <div ref={introImage} data-scroll data-scroll-speed="0.3" className={styles.introImage}>
                        <Image
                            src={'/images/b4.jpg'}
                            alt="intro image"
                            fill={true} 
                            priority={true}
                        />
                    </div>
                    <h1 ref={txt} data-scroll data-scroll-speed="0.7">SAFAI STORIES</h1>
             </div>
             
        </div>
    )
}