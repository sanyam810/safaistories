import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';

export const GET = async (req) => {

    noStore();
    const {searchParams} = new URL(req.nextUrl);

    // const page = searchParams.get("page");
    const page = parseInt(searchParams.get("page")) || 1;
    const POST_PER_PAGE = 10000000;

    const query={
        take:POST_PER_PAGE,
        skip: POST_PER_PAGE * (page-1),
        orderBy: { createdAt: 'desc' }
    }

    try{
        const [posts,count]= await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count(),
        ]
        );

        return new NextResponse(JSON.stringify({posts,count},{status:200}));
    }
    catch(err){
        return new NextResponse(JSON.stringify({ message: err.message },{status:500}));
    }

};