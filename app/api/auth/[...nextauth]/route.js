import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '@utils/database';
import User from '@models/user';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async session({ session, token }) {
      try {
        await connectToDatabase();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s+/g, '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return false;
      }
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };