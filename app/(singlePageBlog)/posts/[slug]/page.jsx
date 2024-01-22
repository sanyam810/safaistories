"use client"
// "use server"

import Image from "next/image";
import Comments from "@/components/commentsC/comments";
import Nav from "@/components/nav";
import { useState, useEffect } from "react";
import { getAuthSession } from "@/utils/auth";
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';

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

const getData = async (slug, setLikesCount) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  let data; // Variable to store the result of res.json()

  try {
    if (res.ok) {
      data = await res.json();
      setLikesCount(data.likesCount);
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
  const [data, setData] = useState(null); // State to store the fetched data
  const { data: session, status } = useSession();


  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(slug, setLikesCount);
      setData(result);
    };

    const checkLikeStatus = async () => {
      // Check if the user is signed in
      if (status === 'authenticated') {
        // Use session.user.email or other user properties as needed
        const email = session?.user?.email;

        // Check if the cookie exists for the liked status
        const likedStatus = Cookies.get(`liked_post_${slug}_${email}`);
        if (likedStatus === 'true') {
          setLiked(true);
        }
      }
    };

    fetchData(); // Invoke the async function immediately
    checkLikeStatus();

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
            Cookies.remove(`liked_post_${slug}_${email}`);
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
            Cookies.set(`liked_post_${slug}_${email}`, 'true', { expires: 30 });
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


  

  const contentStyle = {
    paddingTop: '5rem', // Adjust this value to create space below the fixed navbar
  };

  return (
    <div>
      <Nav />
      <div style={{ margin: '0 auto', minHeight: '100vh', maxWidth: '80rem' }}>
        {/* Apply padding top to the content section */}
        <div style={contentStyle}>
          {data && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              <div style={titleStyle}>
                {data.title}
              </div>
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
              <div style={{ height: '1px', width: '100%', backgroundColor: 'black', margin: '1rem 0' }}></div>
            </div>
          )}

          <div>
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
          </div>

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
