import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/contact";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimited = checkRateLimit(request, 10);
  if (!rateLimited.allowed) {
    return NextResponse.json({ error: "Trop de tentatives, réessayez plus tard." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Email invalide" }, { status: 400 });
  }

  // TODO: persist to a `newsletter_subscribers` table, or forward to an ESP
  // (Mailchimp/Brevo/Resend audiences). Logging only for this scaffold.
  console.log("[newsletter] new subscriber:", parsed.data.email);

  return NextResponse.json({ ok: true }, { status: 201 });
}
