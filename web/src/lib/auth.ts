import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations/auth";

/**
 * NextAuth v5 scaffold. Wire `authorize` to a real users table
 * (Prisma/Drizzle against Postgres) with a hashed-password comparison
 * (bcrypt/argon2) before using this in production. Currently returns
 * `null` for every attempt, so sign-in intentionally fails until wired up.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  trustHost: true,
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        // TODO: replace with a real lookup, e.g.:
        // const user = await db.user.findUnique({ where: { email: parsed.data.email } });
        // if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return null;
        // return { id: user.id, name: user.name, email: user.email, role: user.role };
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? "customer";
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { role?: string }).role = token.role as string | undefined;
      return session;
    },
  },
});
