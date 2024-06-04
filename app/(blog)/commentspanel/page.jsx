"use client";

import { useState, useEffect } from 'react';
import PC from '@/components/PC';
import Nav from '@/components/nav';
import { unstable_noStore as noStore } from 'next/cache';

const ComPan = ({ searchParams }) => {
  noStore();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState('');

  const getData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/postpanel`, {
        cache: 'no-cache',
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      setPosts(data); // Assuming data is an array of posts
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePostSelect = (event) => {
    setSelectedPost(event.target.value);
  };

  const filteredPostTitles = posts.map((post) => (
    <option key={post.slug} value={post.slug}>
      {post.title}
    </option>
  ));

  return (
    <div>
      {/* <div>
        <Nav />
      </div> */}
      <div className="container mx-auto py-8">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white font shadow-md rounded px-8 py-6" style={{marginTop:'500px'}}>
          <h1 className="text-3xl mb-4 text-center">Select the post for which you want to delete the comments</h1>
          <div className="flex flex-col items-center" style={{paddingTop:'20px'}}>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-60"
              onChange={handlePostSelect}
              value={selectedPost}
            >
              <option value=""></option>
              {filteredPostTitles}
            </select>
            <PC postSlug={selectedPost} />
          </div>
        </div>
    </div>
    </div>
    </div>
    
  );
};

export default ComPan;