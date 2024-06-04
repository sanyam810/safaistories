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
import { useRef } from "react";
import Highlight from "@/components/highlight";
// import Navbar from "@/components/navbarC/navbar";


export default function Home({searchParams}) {

  const page = parseInt(searchParams.page) || 1;
  const cardListRef = useRef();
  const contactRef = useRef();
  const homeRef=useRef();
  const aboutRef=useRef();

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

  const scrollToCardList = () => {
    cardListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const scrollToHome = () => {
    homeRef.current?.scrollIntoView({ behavior: 'smooth' });
  }



  return (
    <main>
      <div className="hidden md:block">
        <Navbar scrollToCardList={scrollToCardList} scrollToContact={scrollToContact} scrollToAbout={scrollToAbout} scrollToHome={scrollToHome}/>
      </div>
      <div className="md:hidden">
        <MobileNav scrollToCardList={scrollToCardList} scrollToContact={scrollToContact} scrollToAbout={scrollToAbout} scrollToHome={scrollToHome} />
      </div>
      <div>

      </div>
      
      <div ref={homeRef}>
        <Hero />
      </div>
      
      
      <div>
        <div ref={aboutRef}>
          <Description />
        </div>
        
        <Featured/>
        <Highlight />
        
        <div ref={cardListRef}>
          <CardList page={page} />
        </div>
        <div ref={contactRef}id="contact">
          <ContactUs />
        </div>
        
        {/* <Footer /> */}
      </div>
        
    </main>
  )
}