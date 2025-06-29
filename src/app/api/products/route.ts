import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Create a product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("POST /products body:", body);
    const product = await prisma.product.create({
      data: {
        amount: body.amount,
        name: body.name,
        photo: body.photo,
        tag: body.tag,
        rating: body.rating,
        reviews: body.reviews,
        ecoFriendly: body.ecoFriendly ?? false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /products error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const name = searchParams.get("name");
    const tag = searchParams.get("tag");
    const rating = searchParams.get("rating");
    const minRating = searchParams.get("minRating");
    const maxRating = searchParams.get("maxRating");
    const ecoFriendly = searchParams.get("ecoFriendly");

    const filters: any = {};

    if (name) {
      filters.name = { contains: name, mode: "insensitive" };
    }

    if (tag) {
      filters.tag = tag;
    }

    if (rating) {
      filters.rating = parseInt(rating);
    }

    if (minRating || maxRating) {
      filters.rating = {
        ...(minRating && { gte: parseInt(minRating) }),
        ...(maxRating && { lte: parseInt(maxRating) }),
      };
    }

    if (ecoFriendly !== null) {
      if (ecoFriendly === "true" || ecoFriendly === "false") {
        filters.ecoFriendly = ecoFriendly === "true";
      }
    }

    const products = await prisma.product.findMany({
      where: filters,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
