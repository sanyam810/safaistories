import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';

export const GET = async (req) => {

    noStore();
    const {searchParams} = new URL(req.nextUrl);
    const page = parseInt(searchParams.get("page")) || 1;
    const POST_PER_PAGE = 10000000;

    const query={
        take:POST_PER_PAGE,
        skip: POST_PER_PAGE * (page-1),
        orderBy: { createdAt: 'desc' }
    }

    try{
        const [highlight,count]= await prisma.$transaction([
            prisma.highlight.findMany(query),
            prisma.highlight.count(),
        ]
        );

        return new NextResponse(JSON.stringify({highlight,count},{status:200}));
    }
    catch(err){
        return new NextResponse(JSON.stringify({ message: err.message },{status:500}));
    }

};