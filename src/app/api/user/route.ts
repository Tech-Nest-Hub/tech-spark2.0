import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Get the authenticated user's ID from Clerk
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the user in your database using the Clerk ID
    const user = await prisma.user.findUnique({
      where: { 
        clerkId: userId 
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ user });
    
  } catch (error) {
    console.log("Error fetching user: ", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}