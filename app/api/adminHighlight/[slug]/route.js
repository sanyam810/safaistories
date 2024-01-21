import prisma from "@/utils/connect";
import { NextResponse } from "next/server";



export const GET = async (req,{params}) => {

    const {slug} = params;
    // const {searchParams} = new URL(req.nextUrl);

    // const page = searchParams.get("page");
    // const page = parseInt(searchParams.get("page")) || 1;
    // const POST_PER_PAGE = 2;

    try{
        const highlight=await prisma.post.update({
            where:{
                slug
            },
            data:{views:{increment:1}},
            include:{user:true}
        });

        return new NextResponse(JSON.stringify(highlight,{status:200}));
    }
    catch(err){
        return new NextResponse(JSON.stringify({ message: err.message },{status:500}));
    }

};

export const DELETE = async (req,{params}) => {
    const {slug} = params;
  
    try {
      const deletedHighlights = await prisma.highlight.delete({
        where: {
          slug,
        },
      });
  
      return new NextResponse(
        JSON.stringify(deletedHighlights, { status: 200 })
      );
    } catch (err) {
      console.error(err);
      return new NextResponse(
        JSON.stringify({ message: err.message }, { status: 500 })
      );
    }
};

export const PUT = async (req, { params }) => {
  const { slug } = params;

  try {
    // Set current highlight to featured: true
    const updatedHighlight = await prisma.highlight.updateMany({
      where: {
        slug,
      },
      data: {
        featured: true,
      },
    });

    // Set rest of the highlights to featured: false
    const resetOtherHighlights = await prisma.highlight.updateMany({
      where: {
        slug: {
          not: slug,
        },
      },
      data: {
        featured: false,
      },
    });

    return new NextResponse(
      JSON.stringify({ updatedHighlight, resetOtherHighlights }, { status: 200 })
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: err.message }, { status: 500 })
    );
  }
};

