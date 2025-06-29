import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  try {
    console.log("7");
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    console.log(userId);
    // check if user already exists in your DB
    const existing = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    console.log("existimng", existing);
    if (existing) return NextResponse.json({ user: existing });

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

    // create new user in your DB
    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        username,
        name,
        role: "USER", // Optional: Prisma will default to USER
      },
    });

    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.log("Error syncing: ", error);
    return NextResponse.json({ error });
  }
}
