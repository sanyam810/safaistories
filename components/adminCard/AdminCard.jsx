"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

import toast from "react-hot-toast";

const AdminCard = ({ key, item }) => {


  const mainDivStyle = {
    borderRadius: '40px', // Adjust the value to make the corners rounder
    paddingBottom: '40px', // Increase height (optional)
    /* Add other styles if needed */
  };

  const handleDelete = async () => {
    try{
      const res= await fetch(`http://localhost:3000/api/posts/${item.slug}`,{
        method: 'DELETE',
    });
    if(res.ok){
      toast.success('Post deleted successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if(!res.ok){
      if (!res.ok) {
        toast.error('Error deleting post');
      }
    }
    }catch(err){
      console.log('Delete errorr',err);
    }
  }

    return (
      <div className="bg-white shadow-lg rounded-md p-6 mb-8" style={{marginBottom:'12px'}}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{item.title}</h2>
        </div>
        <p className="text-gray-600 mb-4">{item.desc.substring(3, 150)}...</p>
        <div className="flex items-center text-gray-500">
          <span>Author Email: {item.userEmail || "Unknown"}</span>
          <span style={{marginLeft:'5px'}}  className="mx-2">|</span>
          <span style={{marginLeft:'5px'}}>{item.createdAt.substring(0, 10)}</span>
        </div>
        <Button variant="destructive" onClick={handleDelete} style={{marginTop:'10px'}}>Delete</Button>
      </div>
    );
  };

export default AdminCard;
