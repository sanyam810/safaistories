// pages/api/search.js
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.nextUrl);
  const searchTerm = searchParams.get("q");

  if (!searchTerm) {
    return new NextResponse(
      JSON.stringify({ message: "Search term is required.", status: 400 })
    );
  }

  const query = {
    where: {
      OR: [
        { title: { contains: searchTerm, mode:'insensitive' } }, // Remove caseSensitive option
      ],
    },
    select: { // Selecting only the required fields
      title: true,
      img: true, // Assuming 'img' is the field for image
      desc: true // Assuming 'desc' is the field for description
    }
  };

  try {
    const posts = await prisma.post.findMany(query);
    const titles = posts.map((post) => ({
      title: post.title,
      img: post.img,
      desc: post.desc
      }));

    return new NextResponse(
      JSON.stringify({ titles, status: 200 })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: err.message, status: 500 })
    );
  }
};
