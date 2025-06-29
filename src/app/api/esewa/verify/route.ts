import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as xml2js from "xml2js";

export async function POST(req: NextRequest) {
  const { oid, amt, refId } = await req.json();

  const url = `https://rc.esewa.com.np/epay/transrec?q=amt=${amt}&scd=EPAYTEST&pid=${oid}&rid=${refId}`;
  const response = await fetch(url);
  const xml = await response.text();

  const result = await xml2js.parseStringPromise(xml);
  const status = result?.response?.status?.[0];

  if (status === "Success") {
    await prisma.order.update({
      where: { id: oid },
      data: { status: "PAID" },
    });

    return NextResponse.json({ success: true });
  }

  await prisma.order.update({
    where: { id: oid },
    data: { status: "FAILED" },
  });

  return NextResponse.json({ error: "Verification failed" }, { status: 400 });
}
