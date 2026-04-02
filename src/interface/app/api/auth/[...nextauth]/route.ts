// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Depra Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // In production, this calls your actual DEPRA backend
        // const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // });
        // const user = await res.json();

        // MOCK SUCCESS: Returning a mock user + backend JWT
        if (credentials.email === "admin@payd.com" && credentials.password === "password123") {
          return {
            id: "1",
            name: "Admin",
            email: credentials.email,
            // This is the key you got from your backend
            backendJwt: "depra_bk_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Step 1: When user logs in, attach the backendJwt to the NextAuth JWT
      if (user) {
        token.accessToken = (user as any).backendJwt;
      }
      return token;
    },
    async session({ session, token }) {
      // Step 2: Make that token available to the frontend hooks
      if (session.user) {
        (session.user as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };