import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {

    const {searchParams} = new URL(req.url);
    const postSlug= searchParams.get("postSlug");
    
    try{
        const comments= await prisma.comment.findMany({
            where:{
                ...(postSlug && {postSlug}),
            },
            include:{user:true}
        }
        );

        return new NextResponse(JSON.stringify(comments,{status:200}));
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
        const comment= await prisma.comment.create({
            data: {...body,userEmail:session.user.email},   
        });

        return new NextResponse(JSON.stringify(comment,{status:200}));
    }
    catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({ message: err.message },{status:500}));
    }
};

export const DELETE = async (req) => {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }, { status: 401 }));
    }

    const {searchParams} = new URL(req.url);
    const id= searchParams.get("commentId");
  
    try {
       // Assuming you're expecting the comment ID in the URL
      if (!id) {
        return new NextResponse(JSON.stringify({ message: "Comment ID is required" }, { status: 400 }));
      }
  
      const comment = await prisma.comment.delete({
        where: {id}, // Adjust the field based on your comment ID schema
      });
  
      return new NextResponse(JSON.stringify(comment, { status: 200 }));
    } catch (err) {
      console.error(err);
      return new NextResponse(JSON.stringify({ message: err.message }, { status: 500 }));
    }
};