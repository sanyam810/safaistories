import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

export const POST = async (req,res) => {
    const session = await getAuthSession();
    const email = session?.user?.email;

    const { slug } = res.params;
    console.log("Slug in params:", slug);

    try {
        // Remove the duplicate declaration
        if (!slug) {
            return new NextResponse(
                JSON.stringify({ message: 'Slug is missing' }, { status: 400 })
            );
        }

        const post = await prisma.post.findUnique({
            where: { slug },
        });

        if (!post) {
            return new NextResponse(
                JSON.stringify({ message: 'Post not found' }, { status: 404 })
            );
        }

        const existingLike = await prisma.yellowflag.findFirst({
            where: {
                postSlug: slug,
                userEmail: email,
            },
        });

        if (existingLike) {
            return new NextResponse(
                JSON.stringify({ message: 'Already liked' }, { status: 400 })
            );
        }

        const like = await prisma.yellowflag.create({
            data: {
                userEmail: email,
                postSlug: slug,
            },
        });

        return new NextResponse(JSON.stringify(like, { status: 200 }));
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: error.message }, { status: 500 })
        );
    }
};

export default async (req, res) => {
    const session = await getAuthSession();
    const email = session?.user?.email;
  
    const { slug } = res.params;
  
    try {
      if (!slug || !email) {
        return res.status(400).json({ message: 'Slug or email is missing' });
      }
  
      const existingLike = await prisma.yellowflag.findFirst({
        where: {
          postSlug: slug,
          userEmail: email,
        },
      });
  
      const liked = !!existingLike;
  
      res.status(200).json({ liked });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };