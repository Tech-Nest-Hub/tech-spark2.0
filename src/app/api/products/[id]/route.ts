import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = getParam(req.url);
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(`GET /products/${id} error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id]
export async function PATCH(req: NextRequest) {
  const id = getParam(req.url);
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        photo: body.photo,
        tag: body.tag,
        rating: body.rating,
        reviews: body.reviews,
        ecoFriendly: body.ecoFriendly,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(`PATCH /products/${id} error:`, error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]
export async function DELETE(req: NextRequest) {
  const id = getParam(req.url);
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const deleted = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error(`DELETE /products/${id} error:`, error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
