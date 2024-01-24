import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

export const DELETE = async (req, res) => {
    const session = await getAuthSession();
    const email = session?.user?.email;

    const { slug } = res.params;

    try {
        if (!slug) {
            return new NextResponse(
                JSON.stringify({ message: 'Slug is missing' }, { status: 400 })
            );
        }

        const existingLike = await prisma.redflag.findFirst({
            where: {
                postSlug: slug,
                userEmail: email,
            },
        });

        if (!existingLike) {
            return new NextResponse(
                JSON.stringify({ message: 'Not liked yet' }, { status: 400 })
            );
        }

        await prisma.redflag.delete({
            where: {
                id: existingLike.id,
            },
        });

        return new NextResponse(
            JSON.stringify({ message: 'Successfully unliked' }, { status: 200 })
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: error.message }, { status: 500 })
        );
    }
};

export default async (req, res) => {
    const session = await getAuthSession();
    const email = session?.user?.email;
  
    const { slug } = res.params;
  
    try {
      if (!slug || !email) {
        return res.status(400).json({ message: 'Slug or email is missing' });
      }
  
      const existingLike = await prisma.redflag.findFirst({
        where: {
          postSlug: slug,
          userEmail: email,
        },
      });
  
      const liked = !!existingLike;
  
      res.status(200).json({ liked });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };