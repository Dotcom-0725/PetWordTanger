import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimited = checkRateLimit(request);
  if (!rateLimited.allowed) {
    return NextResponse.json({ error: "Trop de tentatives, réessayez plus tard." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Données invalides" }, { status: 400 });
  }

  // TODO: persist to a `contact_messages` table for the admin inbox, and/or
  // send a transactional email (Resend/SendGrid) to the shop's inbox.
  console.log("[contact] new message:", parsed.data);

  return NextResponse.json({ ok: true }, { status: 201 });
}
