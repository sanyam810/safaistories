import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
import { unstable_noStore as noStore } from 'next/cache';


export const POST = async (req, res) => {
  noStore();
    // Ensure that the request method is POST
    if (req.method !== 'POST') {
      return NextResponse.error(new Error('Method Not Allowed'), 405);
    }
  
    // Extract data from the request body
    const { slug } = req.query;
    const { flag } = req.body;
  
    try {
      // Retrieve the post using Prisma
      const post = await prisma.post.findUnique({
        where: { slug },
      });
  
      // If the post is not found, return a 404 response
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Update the post based on the voted flag
      switch (flag) {
        case 'green':
          await prisma.post.update({
            where: { slug },
            data: { greenCount: post.greenCount + 1 },
          });
          break;
        case 'yellow':
          await prisma.post.update({
            where: { slug },
            data: { yellowCount: post.yellowCount + 1 },
          });
          break;
        case 'red':
          await prisma.post.update({
            where: { slug },
            data: { redCount: post.redCount + 1 },
          });
          break;
        default:
          break;
      }
  
      // Return a success response
      return res.status(200).json({ success: true });
    } catch (error) {
      // Handle errors and return a 500 response
      console.error('Error handling vote:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };