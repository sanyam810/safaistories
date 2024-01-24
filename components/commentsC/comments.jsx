"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Image from "next/image";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    toast.success("Comment added successfully!");
    mutate();
  };
  

  return (
    <div className="mx-auto max-w-screen-xl">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Comments</h1>
      {status === "authenticated" ? (
        <div className="mb-6 mt-8">
          <textarea
            placeholder="Write a comment..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setDesc(e.target.value)}
          />
            <div style={{paddingTop:'10px'}}>
              <Button variant="default"  onClick={handleSubmit}>Send</Button>
            </div>
            <div className="text-white">Hello</div>
          
        </div>
      ) : (
        <p className="mb-6" style={{paddingBottom:'20px'}}>
          <a href="/login" className="text-blue-500 hover:underline">
            Login to write a comment
          </a>
        </p>
      )}
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data?.map((item,index) => (
            <div key={item._id} className={`bg-white rounded-lg shadow-md p-4 mb-4 ${index !== 0 ? 'mt-4' : ''}`}  style={{ paddingLeft: '20px' ,paddingTop:'10px',paddingBottom:'10px',paddingRight:'20px'}}>
              <div className="flex items-center mb-2">
                {item?.user?.image && (
                  <div className="rounded-full overflow-hidden w-10 h-10">
                    <Image
                      src={item.user.image}
                      alt=""
                      width={40}
                      height={40}
                      className="object-cover"
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                )}
                <div>
                  <div className="pl-8 font-bold">{item.user.name}</div>
                  <div className="pl-8">{item.createdAt.substring(0,10)}</div>
                </div>
              </div>
              <div>
                <div className="pt-2 mb-4">
                  {item.desc}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default Comments;
