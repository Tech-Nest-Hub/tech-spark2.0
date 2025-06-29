import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const existing = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existing) return NextResponse.json({ user: existing });
    console.log(18);
    // fetch Clerk user
    const clerk = await clerkClient();
    const clerkUser = await clerk.users.getUser(userId);

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const username =
      clerkUser.username ||
      email?.split("@")[0] ||
      `user_${Math.random().toString(36).slice(2, 8)}`;
    const name = [clerkUser.firstName, clerkUser.lastName]
      .filter(Boolean)
      .join(" ");

    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        username,
        role: "USER", // Optional: Prisma will default to USER
      },
    });

    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.log("Error syncing: ", error);
    return NextResponse.json({ error });
  }
}
