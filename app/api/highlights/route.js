import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const highlights = await prisma.highlight.findMany();

        if (!highlights) {
            throw new Error("HIghlight not found");
        }
        
        return new NextResponse(JSON.stringify(highlights), { status: 200 });
    } catch (err) {
        console.error("Error fetching highlights:", err);

        return new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
    }
};

export const POST = async (req) => {

    const session = await getAuthSession()
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" },{status:401}));
    }
    
    try{
        const body = await req.json();
        const highlight= await prisma.highlight.create({
            data: {...body,userEmail:session.user.email},   
        });

        return new NextResponse(JSON.stringify(highlight,{status:200}));
    }
    catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({ message: err.message },{status:500}));
    }

};
