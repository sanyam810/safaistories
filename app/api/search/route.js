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
        { title: { contains: searchTerm } }, // Remove caseSensitive option
      ],
    },
  };

  try {
    const posts = await prisma.post.findMany(query);
    const titles = posts.map((post) => post.title);

    return new NextResponse(
      JSON.stringify({ titles, status: 200 })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: err.message, status: 500 })
    );
  }
};
