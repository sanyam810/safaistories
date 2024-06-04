import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';

export const GET = async (req) => {
    noStore();
    try {
        const posts = await prisma.post.findMany({
            include: { user: true }
        });

        // Ensure the posts are retrieved properly
        if (!posts) {
            throw new Error("Posts not found");
        }

        // Return the posts in the response
        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
        console.error("Error fetching posts:", err);

        return new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
    }
};