"use client";

import { useState,useEffect } from 'react';
import AuthLinks from "./authlinks";
// import audioFile from "./audioFinal.mp3";

const Nav = () => {

    // const [isPlaying, setIsPlaying] = useState(false);
    // const [audio] = useState(new Audio(audioFile));

    // const toggleAudio = () => {
    //     if (isPlaying) {
    //       audio.pause();
    //     } else {
    //       audio.play();
    //     }
    //     setIsPlaying(!isPlaying);
    // };

    // useEffect(() => {
    //     audio.onended = () => {
    //       setIsPlaying(false); // Reset state when audio finishes playing
    //     };
    //   }, [audio]);

    return (
        <div className="fixed top-0 w-full bg-transparent z-50 nav" >
            <div className="flex justify-center py-4 px-8">
                <div className="flex gap-10 bg-white pt-2 pb-2 pl-8 pr-8 rounded-3xl text-lg">
                    <div>Home</div>
                    <div>About</div>
                    <div>Blogs</div>
                    <AuthLinks/>
                    {/* <div>
                      <button onClick={toggleAudio}>{isPlaying ? 'Stop Audio' : 'Play Audio'}</button>
                    </div> */}
                    <div>Contact</div>
                </div>
            </div>
            <style jsx>{`
                /* Adjust font sizes and layout for smaller screens */
                @media (max-width: 768px) {
                    .nav {
                        padding-left: 8px;
                        padding-right: 8px;
                      }
            
                      .flex {
                        gap: 14px;
                      }
                }
                `}
            </style>
        </div>
    );
}
 
export default Nav;