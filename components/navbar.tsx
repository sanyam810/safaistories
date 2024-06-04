'use client';

import { useRef } from "react";
import { FC } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import AuthLinks from "./authlinks";

interface NavbarProps {
    scrollToCardList: () => void;
    scrollToContact: ()=> void;
    scrollToHome: ()=> void;
    scrollToAbout: ()=> void;
  }

  const Navbar: FC<NavbarProps> = ({ scrollToCardList,scrollToContact,scrollToAbout,scrollToHome }) => {

    const nav = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (nav.current) {
          gsap.fromTo(nav.current, {
            y: -100,
            opacity: 0,
            delay: 3,
            duration: 1,
            ease: "power4.out"
          }, {
            y: 0,
            delay: 3,
            opacity: 1,
            duration: 3,
            ease: "power4.out"
          });
        }
      }, []);

    return (
        <div ref={nav} className="fixed w-full bg-transparant z-50">
                <div className="flex justify-center py-4 px-8 ">
                    <div className="flex gap-10 bg-white pt-2 pb-2 pl-8 pr-8 rounded-3xl text-lg">
                        <div className='cursor-pointer' onClick={scrollToHome}>Home</div>
                        <div className='cursor-pointer' onClick={scrollToAbout}>About</div>
                        <div className='cursor-pointer' onClick={scrollToCardList}>Blogs</div>
                        <AuthLinks/>
                        <div className='cursor-pointer' onClick={scrollToContact}>Contact</div>
                    </div>
                </div>
        </div>
    );
}
 
export default Navbar;