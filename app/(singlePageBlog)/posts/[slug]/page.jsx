"use client"
// "use server"

import Image from "next/image";
import Comments from "@/components/commentsC/comments";
import Nav from "@/components/nav";
import MobileNav from "@/components/mobileNav";
import { useState, useEffect } from "react";
import { getAuthSession } from "@/utils/auth";
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { HiFlag } from 'react-icons/hi';  // Lucide's HiFlag for yellow flag
import { BiCheck } from 'react-icons/bi';  // Lucide's BiCheck for green flag
import { FiAlertCircle } from 'react-icons/fi'; 
// import { Image } from "next/image";

import { useRouter } from "next/navigation";



import gflag from '@/public/images/gflag.png';
import yflag from '@/public/images/yflag.png';
import rflag from '@/public/images/rflag.png';

import Cookies from 'js-cookie';

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
  lineHeight: '1.6'
  // Add more font styles as needed
};

const getData = async (slug, setLikesCount,setGreenCount,setRedCount,setYellowCount) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  let data; // Variable to store the result of res.json()

  try {
    if (res.ok) {
      data = await res.json();
      setLikesCount(data.likesCount);
      setGreenCount(data.greenCount);
      setRedCount(data.redCount);
      setYellowCount(data.yellowCount);
    } else {
      throw new Error("Failed");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return data;
};

const SinglePage = ({ params }) => {
  const { slug } = params;
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [greenCount, setGreenCount] = useState(0);
  const [green, setGreen] = useState(false);
  const [yellowCount, setYellowCount] = useState(0);
  const [yellow, setYellow] = useState(false);
  const [redCount, setRedCount] = useState(0);
  const [red, setRed] = useState(false);
  const [data, setData] = useState(null); // State to store the fetched data
  const { data: session, status } = useSession();

  const router = useRouter();
  


  useEffect(() => {
    const fetchData = async () => {
    try {
      const result = await getData(slug, setLikesCount, setGreenCount, setRedCount, setYellowCount);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    const checkLikeStatus = async () => {
      if (status === 'authenticated') {
        const email = session?.user?.email;
        const likedStatus = Cookies.get(`liked_post_${slug}_${email}_like`);
        if (likedStatus === 'true') {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }
    };

    const checkGreenStatus = async () => {
      if (status === 'authenticated') {
        const email = session?.user?.email;
        const greenStatus = Cookies.get(`liked_post_${slug}_${email}_green`);
        if (greenStatus === 'true') {
          setGreen(true);
        } else {
          setGreen(false);
        }
      }
    };


    const checkYellowStatus = async() => {
      if (status === 'authenticated') {
        const email = session?.user?.email;
        const yellowStatus = Cookies.get(`liked_post_${slug}_${email}_yellow`);
        if (yellowStatus === 'true') {
          setYellow(true);
        } else {
          setYellow(false);
        }
      }
    };

    const checkRedStatus = async() => {
      if (status === 'authenticated') {
        const email = session?.user?.email;
        const redStatus = Cookies.get(`liked_post_${slug}_${email}_red`);
        if (redStatus === 'true') {
          setRed(true);
        } else {
          setRed(false);
        }
      }
    };




    // Invoke the async function immediately
    checkLikeStatus();
    checkGreenStatus();
    checkYellowStatus();
    checkRedStatus();

    fetchData(); 

  }, [slug,session, status]);

  const handleLike = async () => {
    try {
      // Check if the user is signed in
      if (status === 'authenticated') {
        const email = session?.user?.email;

        // Check if the post is already liked
        if (liked) {
          // Unlike the post
          const res = await fetch(`http://localhost:3000/api/posts/${slug}/unlike`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug }),
          });

          if (res.ok) {
            // Remove the cookie and update state
            Cookies.remove(`liked_post_${slug}_${email}_like`);
            setLiked(false);
            setLikesCount((prevCount) => prevCount - 1);
          } else {
            console.error('Failed to unlike the post');
          }
        } else {
          // Like the post
          const res = await fetch(`http://localhost:3000/api/posts/${slug}/like`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug }),
          });

          if (res.ok) {
            // Set the cookie and update state
            Cookies.set(`liked_post_${slug}_${email}_like`, 'true', { expires: 30 });
            setLiked(true);
            setLikesCount((prevCount) => prevCount + 1);
          } else {
            console.error('Failed to like the post');
          }
        }
      } else {
        console.error('User not signed in');
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const handleGreen = async () => {
    try {
      // Check if the user is signed in
      if (status === 'authenticated') {
        const email = session?.user?.email;

        // Check if the post is already liked
        if (green) {
          // Unlike the post
          const res = await fetch(`http://localhost:3000/api/posts/${slug}/greenflagul`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug }),
          });

          if (res.ok) {
            // Remove the cookie and update state
            Cookies.remove(`liked_post_${slug}_${email}_green`);
            setGreen(false);
            setGreenCount((prevCount) => prevCount - 1);
          } else {
            console.error('Failed to unlike the post');
          }
        } else {
          // Like the post
          const res = await fetch(`http://localhost:3000/api/posts/${slug}/greenflagl`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug }),
          });

          if (res.ok) {
            // Set the cookie and update state
            Cookies.set(`liked_post_${slug}_${email}_green`, 'true', { expires: 30 });
            setGreen(true);
            setGreenCount((prevCount) => prevCount + 1);
          } else {
            console.error('Failed to like the post');
          }
        }
      } else {
        console.error('User not signed in');
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const handleYellow = async () => {
    try {
      // Check if the user is signed in
      if (status === 'authenticated') {
        const email = session?.user?.email;

        // Check if the post is already liked
        if (yellow) {
          // Unlike the post
          const res = await fetch(`http://localhost:3000/api/posts/${slug}/yellowflagul`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug }),
          });

          if (res.ok) {
            // Remove the cookie and update state
            Cookies.remove(`liked_post_${slug}_${email}_yellow`);
            setYellow(false);
            setYellowCount((prevCount) => prevCount - 1);
          } else {
            console.error('Failed to unlike the post');
          }
        } else {
          // Like the post
          const res = await fetch(`http://localhost:3000/api/posts/${slug}/yellowflagl`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug }),
          });

          if (res.ok) {
            // Set the cookie and update state
            Cookies.set(`liked_post_${slug}_${email}_yellow`, 'true', { expires: 30 });
            setYellow(true);
            setYellowCount((prevCount) => prevCount + 1);
          } else {
            console.error('Failed to like the post');
          }
        }
      } else {
        console.error('User not signed in');
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const handleRed = async () => {
    try {
      // Check if the user is signed in
      if (status === 'authenticated') {
        const email = session?.user?.email;

        // Check if the post is already liked
        if (red) {
          // Unlike the post
          const res = await fetch(`http://localhost:3000/api/posts/${slug}/redflagul`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug }),
          });

          if (res.ok) {
            // Remove the cookie and update state
            Cookies.remove(`liked_post_${slug}_${email}_red`);
            setRed(false);
            setRedCount((prevCount) => prevCount - 1);
          } else {
            console.error('Failed to unlike the post');
          }
        } else {
          // Like the post
          const res = await fetch(`http://localhost:3000/api/posts/${slug}/redflagl`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug }),
          });

          if (res.ok) {
            // Set the cookie and update state
            Cookies.set(`liked_post_${slug}_${email}_red`, 'true', { expires: 30 });
            setRed(true);
            setRedCount((prevCount) => prevCount + 1);
          } else {
            console.error('Failed to like the post');
          }
        }
      } else {
        console.error('User not signed in');
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };


  

  const contentStyle = {
    paddingTop: '5rem', // Adjust this value to create space below the fixed navbar
  };

  const handleEdit = () => {
    router.push(`/edit/${slug}`);
  };

  return (
    <div>
      <div className="hidden md:block">
        <Nav />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
      <div style={{ margin: '0 auto', minHeight: '100vh', maxWidth: '80rem' }}>
        {/* Apply padding top to the content section */}
        <div style={contentStyle}>
          {data && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              <div style={titleStyle}>
                {data.title}
              </div>

              {session && (
                <div className="flex flex-row gap-8">
                <div>
                  {session && (
                    <div className="flex flex-row">
                      <button onClick={handleGreen}>
                        {green ? <div className="bg-black">
                          <Image src={gflag} alt="green flag" width={40} height={40} /> 
                        </div>: <Image src={gflag} alt="green flag" width={20} height={20} />}
                      </button>
                      <div>
                      {greenCount}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  {session && (
                    <div className="flex flex-row">
                      <button onClick={handleYellow}>
                        {yellow ? <Image src={yflag} alt="yellow flag" width={40} height={40} /> : <Image src={yflag} alt="yellow flag" width={20} height={20} />}
                      </button>
                      <div>
                      {yellowCount}
                      </div>
                    </div>
                  )}
                </div>
                  
                  
                <div>
                  {session && (
                    <div className="flex flex-row">
                      <button onClick={handleRed}>
                        {red ? <Image src={rflag} alt="yellow flag" width={40} height={40} /> : <Image src={rflag} alt="red flag" width={20} height={20} />}
                      </button>
                      <div>
                      {redCount}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', ...descStyle2 }}>
                {data.user?.image && (
                  <img className="userImage2" src={data.user.image} alt="User" width={48} height={48} style={{ borderRadius: '50%' }} />
                )}
                <div>{data.user.name}</div>
                <div>{data.createdAt.substring(0, 10)}</div>
              </div>
              {data.img && (
                <img src={data.img} alt="Post" className="rounded-lg" width={800} height={500} />
              )}
              <div
                className="prose text-xl lg:prose-lg xl:prose-xl"
                dangerouslySetInnerHTML={{ __html: data.desc }}
                style={{ ...descStyle2 }}
              />
              {session?.user?.email === data.user.email && (
                <button onClick={handleEdit} className="edit-button">
                  Edit Post
                </button>
              )}
              <div style={{ height: '1px', width: '100%', backgroundColor: 'black', margin: '1rem 0' }}></div>
            </div>
          )}

          {/* <div>
            <div>
            {session && (
            <div>
              <button onClick={handleLike} style={{ background: liked ? 'yellow' : 'none' }}>
                {liked ? 'Unlike' : 'Like'}
              </button>
            </div>
            )}
            </div>
            <span>{likesCount} likes</span>
          </div> */}

          
          
          <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
            <Comments postSlug={slug} />
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