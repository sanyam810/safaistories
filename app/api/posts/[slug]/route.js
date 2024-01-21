import prisma from "@/utils/connect";
import { NextResponse } from "next/server";



export const GET = async (req,{params}) => {

    const {slug} = params;
    // const {searchParams} = new URL(req.nextUrl);

    // const page = searchParams.get("page");
    // const page = parseInt(searchParams.get("page")) || 1;
    // const POST_PER_PAGE = 2;

    try{
        const post=await prisma.post.update({
            where:{
                slug
            },
            data:{views:{increment:1}},
            include:{user:true}
        });

        return new NextResponse(JSON.stringify(post,{status:200}));
    }
    catch(err){
        return new NextResponse(JSON.stringify({ message: err.message },{status:500}));
    }

};

export const DELETE = async (req,{params}) => {
    const {slug} = params;
  
    try {
      const deletedPost = await prisma.post.delete({
        where: {
          slug,
        },
      });
  
      return new NextResponse(
        JSON.stringify(deletedPost, { status: 200 })
      );
    } catch (err) {
      console.error(err);
      return new NextResponse(
        JSON.stringify({ message: err.message }, { status: 500 })
      );
    }
};

