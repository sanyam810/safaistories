import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {

    const {searchParams} = new URL(req.nextUrl);

    // const page = searchParams.get("page");
    const page = parseInt(searchParams.get("page")) || 1;
    const POST_PER_PAGE = 4;

    const query={
        take:POST_PER_PAGE,
        skip: POST_PER_PAGE * (page-1),
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

export const POST = async (req) => {

    const session = await getAuthSession()
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" },{status:401}));
    }
    
    try{
        const body = await req.json();
        const post= await prisma.post.create({
            data: {...body,userEmail:session.user.email},   
        });

        return new NextResponse(JSON.stringify(post,{status:200}));
    }
    catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({ message: err.message },{status:500}));
    }

};




