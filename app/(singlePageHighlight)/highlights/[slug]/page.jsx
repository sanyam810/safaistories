"use client"

import Image from "next/image";
import Comments from "@/components/commentsC/comments";
import Nav from "@/components/nav";
import { Button } from "@/components/ui/button";
// import { useState } from "react";

const titleStyle = {
  fontFamily: 'Georgia, serif',
  fontSize: '4rem',
  // Add more font styles as needed
};

const descStyle = {
  fontFamily: 'Georgia, serif',
  fontSize: '1.2rem',
  // Add more font styles as needed
};

const descStyle2 = {
  fontFamily: 'Georgia, serif',
  fontSize: '1.5rem',
  lineHeight: '1.6',
  // Add more font styles as needed
};

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/highlights/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};


  

const SinglePage = async ({ params }) => {
  // const [showTranscript, setShowTranscript] = useState(false);
  let showTranscript = false;
  const { slug } = params;
  const data = await getData(slug);
  const contentStyle = {
    paddingTop: '5rem', // Adjust this value to create space below the fixed navbar
  };
  
  // const toggleTranscript = () => {
  //   setShowTranscript((prev) => !prev);
  // };

  const toggleTranscript = () => {
    showTranscript = !showTranscript;
    // Find the transcript element and toggle its display property
    const transcriptElement = document.getElementById('transcript');
    if (transcriptElement) {
      transcriptElement.style.display = showTranscript ? 'block' : 'none';
    }
  };
  

  return (
    <div>
      <Nav />
      <div style={{ margin: '0 auto', minHeight: '100vh', maxWidth: '80rem' }}>
        {/* Apply padding top to the content section */}
        <div style={contentStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={titleStyle}>
              {data?.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', ...descStyle2 }}>
              <div style={{ flex: '1', marginRight: '1rem' }}>
                {/* Embed YouTube video - Replace 'YOUR_YOUTUBE_VIDEO_ID' with the actual video ID */}
                <iframe width="560"
                 height="315" 
                 src={`${data?.youtubeId}`} 
                 title="YouTube video player" frameborder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                 allowfullscreen>
      
                </iframe>
                
              </div>
              <div style={{ flex: '1' }}>
                <div className="prose text-xl lg:prose-lg xl:prose-xl" dangerouslySetInnerHTML={{ __html: data?.summary }} style={{ ...descStyle2 }} />
              </div>
            </div>
            <Button variant="default" onClick={toggleTranscript}>
              {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
            </Button>
            <div id="transcript"  className="prose text-xl lg:prose-lg xl:prose-xl" dangerouslySetInnerHTML={{ __html: data?.transcript }} style={{ ...descStyle2 , display: 'none'}} />
            <div style={{ height: '1px', width: '100%', backgroundColor: 'black', margin: '1rem 0' }}></div>
          </div>
        </div>
      </div>
      {/* Media Queries for Responsive Design */}
      <style jsx>{`
        /* Adjust font sizes and layout for smaller screens */
        @media (max-width: 768px) {
          div {
            /* Modify styles as needed for smaller screens */
            padding-left: 4px;
            padding-right: 4px;
          }
          .userImage2 {
            width: 24px;
            height: 24px;
          }

          /* Add more media queries and adjust styles as needed */
        }
      `}</style>
    </div>
  );
};

export default SinglePage;