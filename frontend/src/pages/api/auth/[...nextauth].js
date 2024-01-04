import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: "pofect",
      clientSecret: "i5ReczfUTmLra7BZXhwTSrE9u2FRkHJy",
      issuer: "http://localhost:5555/realms/poscodx2023-realm",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        console.log("---------------------");
        console.log(account);
        console.log("---------------------");
        token.accessToken = account.access_token;
        console.log(token.accessToken);
      }

      return token;
    },
    async session({ session, token }) {
      // Add the Refresh Token to the session object
      session.accessToken = token.accessToken;
      console.log(session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
