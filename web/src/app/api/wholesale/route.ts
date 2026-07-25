import { NextResponse } from "next/server";
import { wholesaleSchema } from "@/lib/validations/contact";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimited = checkRateLimit(request);
  if (!rateLimited.allowed) {
    return NextResponse.json({ error: "Trop de tentatives, réessayez plus tard." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = wholesaleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Données invalides" }, { status: 400 });
  }

  // TODO: persist to a `wholesale_inquiries` table (feeds Admin > Wholesale
  // Requests) and notify the sales team.
  console.log("[wholesale] new inquiry:", parsed.data);

  return NextResponse.json({ ok: true }, { status: 201 });
}
