import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId, amount = 100 } = await req.json();
    console.log("productId:", productId);
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    const data: any = {
      user: { connect: { clerkId: userId } },
      amount: amount ? amount : 0, // Default to 0 if amount is not provided
    };

    // Only connect product if productId is given
    if (productId) {
      data.product = { connect: { id: productId } };
    }

    const order = await prisma.order.create({ data });

    const successUrl = `https://tech-spark-2-0.netlify.app/esewa-success?oid=${order.id}&amt=${order.amount}`;
    const failUrl = `https://tech-spark-2-0.netlify.app/esewa-fail?oid=${order.id}`;
    const esewaUrl = `https://rc.esewa.com.np/epay/main?amt=${
      order.amount
    }&pdc=0&psc=0&txAmt=0&tAmt=${order.amount}&pid=${
      order.id
    }&scd=EPAYTEST&su=${encodeURIComponent(successUrl)}&fu=${encodeURIComponent(
      failUrl
    )}`;

    return NextResponse.json({ redirect: esewaUrl });
  } catch (error) {
    console.error("Error initiating eSewa payment:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
