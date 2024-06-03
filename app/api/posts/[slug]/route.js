import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";


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
            include:{user:true,likedBy:true,greenflaggedBy:true,redflaggedBy:true,yellowflaggedBy:true}
        });

        const response = {
          ...post,
          likesCount: post.likedBy.length,
          greenCount: post.greenflaggedBy.length,
          redCount: post.redflaggedBy.length,
          yellowCount: post.yellowflaggedBy.length,
        };

        return new NextResponse(JSON.stringify(response,{status:200}));
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

export const PUT = async (req, { params }) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }, { status: 401 }));
  }

  try {
    const { slug } = params; // Extract slug from params
    const data = await req.json(); // Data to update

    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ message: "Post not found" }, { status: 404 }));
    }

    if (post.userEmail !== session.user.email) {
      return new NextResponse(JSON.stringify({ message: "Forbidden" }, { status: 403 }));
    }

    const updatedPost = await prisma.post.update({
      where: { slug },
      data,
    });

    return new NextResponse(JSON.stringify(updatedPost, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: err.message }, { status: 500 }));
  }
};



