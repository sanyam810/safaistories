import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const featured = await prisma.highlight.findMany({
            where: {
                featured: true
            }
        });

        if (!featured) {
            return new NextResponse(JSON.stringify({ message: "No featured highlight found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(featured), { status: 200 });
    } catch (err) {
        console.error("Error fetching featured:", err);
        return new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
    }
};