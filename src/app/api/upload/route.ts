import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  console.log("Received file:", file);

  // Just check if file exists and has expected shape
  if (!file || typeof (file as any).arrayBuffer !== "function") {
    return NextResponse.json(
      { error: "No valid file provided" },
      { status: 400 }
    );
  }

  try {
    const arrayBuffer = await (file as Blob).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const mimeType = (file as Blob).type || "application/octet-stream";
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: "adminportal",
    });

    return NextResponse.json(
      { url: result.secure_url, public_id: result.public_id },
      { status: 200 }
    );
  } catch (error) {
    console.error("‼ Cloudinary upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: (error as any)?.message || error },
      { status: 500 }
    );
  }
}
