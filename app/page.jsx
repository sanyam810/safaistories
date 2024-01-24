"use client";
import { useEffect } from "react";

import Hero from "@/components/heroC/hero";
import Description from "@/components/desC/description";
import Project from "@/components/projC/project";
import Featured from "@/components/featured";
import Footer from "@/components/footer";
import CardList from "@/components/cardlistC/CardList";
import Navbar from "@/components/navbar";
import ContactUs from "@/components/ContactUs";
import MobileNav from "@/components/mobileNav";
import Highlight from "@/components/highlight";
// import Navbar from "@/components/navbarC/navbar";


export default function Home({searchParams}) {

  const page = parseInt(searchParams.page) || 1;

  useEffect(()=>{
    (
      async()=>{
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        const locomotiveScroll= new LocomotiveScroll();
      }
    )()
  },[])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <main>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
      <div>

      </div>
      
      <Hero />
      
      <div>
        <Description />
        <Featured/>
        <Highlight />
        
        <CardList page={page}/>
        <div id="contact">
        <ContactUs />
        </div>
        
        {/* <Footer /> */}
      </div>
        
    </main>
  )
}