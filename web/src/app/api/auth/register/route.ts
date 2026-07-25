import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations/auth";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * Scaffold only: validates input and rate-limits, but does not persist a
 * user anywhere yet. Wire this to your database once one is chosen:
 *   const passwordHash = await bcrypt.hash(data.password, 12);
 *   await db.user.create({ data: { name: data.name, email: data.email, passwordHash, role: "customer" } });
 */
export async function POST(request: Request) {
  const rateLimited = checkRateLimit(request);
  if (!rateLimited.allowed) {
    return NextResponse.json({ error: "Trop de tentatives, réessayez plus tard." }, { status: 429 });
  }

  const body = await request.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Données invalides" }, { status: 400 });
  }

  // TODO: check for existing email, hash password, persist to database.

  return NextResponse.json({ ok: true }, { status: 201 });
}
