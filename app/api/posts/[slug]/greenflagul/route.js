import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
import { unstable_noStore as noStore } from 'next/cache';

export const DELETE = async (req,res) => {
  noStore();
  const session = await getAuthSession();
  const email = session?.user?.email;

  const { slug } = res.params

  try {
    if (!slug) {
      return new NextResponse(
        JSON.stringify({ message: 'Slug is missing' }),
        { status: 400 }
      );
    }

    const existingLike = await prisma.greenflag.findFirst({
      where: {
        postSlug: slug,
        userEmail: email,
      },
    });

    if (!existingLike) {
      return new NextResponse(
        JSON.stringify({ message: 'Not liked yet' }),
        { status: 400 }
      );
    }

    await prisma.greenflag.delete({
      where: {
        id: existingLike.id,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: 'Successfully unliked' }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }),
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  noStore();
  const session = await getAuthSession();
  const email = session?.user?.email;

  const { slug } = req.query;

  try {
    if (!slug || !email) {
      return new NextResponse(
        JSON.stringify({ message: 'Slug or email is missing' }),
        { status: 400 }
      );
    }

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
