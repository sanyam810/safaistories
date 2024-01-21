import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const phrases = [
  "Lorem ipsum dolor sit amet,",
  "sed do eiusmod tempor incididunt",
  "Ut enim ad minim veniam,",
  "Duis aute irure dolor in ",
  "Excepteur sint occaecat"
];



export default function Description() {
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && textRef.current) {
            gsap.from(textRef.current, {
              opacity: 0,
              x: -100, // Initial position outside the viewport
              duration: 1,
              ease: 'power3.Out',
            });
            textObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // Adjust this threshold as needed
    );

    if (textRef.current && textObserver) {
      textObserver.observe(textRef.current);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageRef.current) {
            gsap.from(imageRef.current, {
              opacity: 0,
              duration: 3,
              ease: 'power3.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 } // Adjust this threshold as needed
    );

    if (imageRef.current && observer) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current && observer) {
        observer.unobserve(imageRef.current);
      }
      if (textRef.current && textObserver) {
        textObserver.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col-reverse items-center justify-center md:flex-row mx-auto min-h-screen max-w-screen-xl gap-24">
      <div
        ref={textRef}
        className="description relative text-black text-3xl uppercase mt-30vw ml-10vw"
      >
        <div className="ml-8 md:ml-0">
          {/* Your text content here */}
          Lorem ipsum dolor sit amet,
          Lorem ipsum dolor sit amet,
          Lorem ipsum dolor sit amet,
          Lorem ipsum dolor sit amet,
          Lorem ipsum dolor sit amet,
          Lorem ipsum dolor sit amet,
        </div>
      </div>
      <img
        ref={imageRef}
        src="/images/logo.png"
        alt="Description"
        className="md:ml-4 w-72 md:w-auto max-w-full"
      />
    </div>
  );
}