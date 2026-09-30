import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const projectType = typeof body.projectType === "string" ? body.projectType.trim() : "";
    const details = typeof body.details === "string" ? body.details.trim() : "";
    const honeypot = typeof body.website === "string" ? body.website.trim() : "";

    if (honeypot) return NextResponse.json({ ok: true });
    if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !projectType || projectType.length > 100 || details.length < 10 || details.length > 5000 || phone.length > 50) {
      return NextResponse.json({ error: "Please check the required fields and try again." }, { status: 400 });
    }

    await db.insert(inquiries).values({ name, email, phone: phone || null, projectType, details });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return NextResponse.json({ error: "We couldn't send your inquiry right now. Please call or text instead." }, { status: 500 });
  }
}
