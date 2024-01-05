import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: "pofect",
      clientSecret: "lRu2t5FaIGkbSWc939JxC9yblwbz3qQj",
      issuer: "http://localhost:5555/realms/pofect-realm",
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
      session.accessToken = token.accessToken;
      console.log(session);
      return session;
    },
  },
  pages: {
    async api({
      req,
      res,
    }) {
      //Token Session검사를 진행하지 않는 API 따로 작성
      if (req.url === "/api/factory-standard/hello") { //테스트용 hello (삭제예정)
        return NextAuth(req, res);
      }
      return NextAuth(req, res);
    },
  },
};

export default NextAuth(authOptions);
