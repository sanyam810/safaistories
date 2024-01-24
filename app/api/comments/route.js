import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.nextUrl);
  const searchTerm = searchParams.get("q");

  if (!searchTerm) {
    return new NextResponse(
      JSON.stringify({ message: "Search term is required." }, { status: 400 })
    );
  }

  const query = {
    where: {
      OR: [
        { title: { contains: searchTerm, caseSensitive: false } },
        { content: { contains: searchTerm, caseSensitive: false } },
      ],
    },
  };

  try {
    const posts = await prisma.post.findMany(query);

    return new NextResponse(
      JSON.stringify({ posts, searchTerm }, { status: 200 })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: err.message }, { status: 500 })
    );
  }
};