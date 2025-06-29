import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(): Promise<NextResponse> {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const existing = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (existing) return NextResponse.json({ user: existing });

  const clerk = await clerkClient();
  const clerkUser = await clerk.users.getUser(userId);
  const email = clerkUser.emailAddresses[0].emailAddress;
  const name = [clerkUser.firstName, clerkUser.lastName]
    .filter(Boolean)
    .join(" ");

  const newUser = await prisma.user.create({
    data: { clerkId: userId, email, name },
  });

  return NextResponse.json({ user: newUser });
}
