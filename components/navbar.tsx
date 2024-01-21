'use client';

import { useRef } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import AuthLinks from "./authlinks";

const Navbar = () => {

    const nav = useRef(null);

    useEffect(()=>{

        gsap.fromTo(nav.current,{
            y:-100,
            opacity:0,
            delay:3,
            duration:1,
            ease:"power4.out"
        },{
            y:0,
            delay:3,
            opacity:1,
            duration:3,
            ease:"power4.out"
        })

    },[])

    return (
        <div ref={nav} className="fixed w-full bg-transparant z-50">
                <div className="flex justify-center py-4 px-8 ">
                    <div className="flex gap-10 bg-white pt-2 pb-2 pl-8 pr-8 rounded-3xl text-lg">
                        <div>Home</div>
                        <div>About</div>
                        <div>Blogs</div>
                        <AuthLinks/>
                        <div>Contact</div>
                    </div>
                </div>
        </div>
    );
}
 
export default Navbar;