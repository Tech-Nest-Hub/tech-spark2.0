import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const existing = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existing) return NextResponse.json({ user: existing });

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    console.log("Role: ", role);
    const clerk = await clerkClient();
    const clerkUser = await clerk.users.getUser(userId);
    console.log("Clerk User: ", clerkUser);
    const email = clerkUser.emailAddresses[0]?.emailAddress;

    const username = [clerkUser.firstName, clerkUser.lastName]
      .filter(Boolean)
      .join(" ");

    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        username,
        role: role === Role.ADMIN ? Role.ADMIN : Role.USER,
      },
    });

    console.log("New user created: ", newUser);

    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.log("Error syncing: ", error);
    return NextResponse.json({ error });
  }
}
