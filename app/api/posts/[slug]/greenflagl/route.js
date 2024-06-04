import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
import { unstable_noStore as noStore } from 'next/cache';

// POST handler for liking a post
export const POST = async (req) => {
  noStore();
  const session = await getAuthSession();
  const email = session?.user?.email;

  const { slug } = await req.json();

  if (!slug) {
    return new NextResponse(
      JSON.stringify({ message: 'Slug is missing' }),
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: 'Post not found' }),
        { status: 404 }
      );
    }

    const existingLike = await prisma.greenflag.findFirst({
      where: {
        postSlug: slug,
        userEmail: email,
      },
    });

    if (existingLike) {
      return new NextResponse(
        JSON.stringify({ message: 'Already liked' }),
        { status: 400 }
      );
    }

    const like = await prisma.greenflag.create({
      data: {
        userEmail: email,
        postSlug: slug,
      },
    });

    return new NextResponse(JSON.stringify(like), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }),
      { status: 500 }
    );
  }
};

// GET handler to check if a post is liked
export const GET = async (req) => {
  noStore();
  const session = await getAuthSession();
  const email = session?.user?.email;

  const { slug } = await req.json();

  if (!slug || !email) {
    return new NextResponse(
      JSON.stringify({ message: 'Slug or email is missing' }),
      { status: 400 }
    );
  }

  try {
    const existingLike = await prisma.greenflag.findFirst({
      where: {
        postSlug: slug,
        userEmail: email,
      },
    });

    const liked = !!existingLike;

    return new NextResponse(JSON.stringify({ liked }), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }),
      { status: 500 }
    );
  }
};
