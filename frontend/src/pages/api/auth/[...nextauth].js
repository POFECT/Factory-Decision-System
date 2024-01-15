import axios from "axios";
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

async function getKeycloakUserInfo(accessToken) {
  try {
    const res = await axios.get(
      "http://localhost:5555/realms/pofect-realm/protocol/openid-connect/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      issuer: process.env.ISSUER,
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
        const userInfo = await getKeycloakUserInfo(token.accessToken);
        token.roles = userInfo.roles;
        token.permissions = userInfo.permissions;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.permissions = token.permissions;
      session.roles = token.roles || []; // 역할 정보 추가, 기본값은 빈 배열
      console.log(session);
      console.log(session.permissions);
      console.log(session.roles);

      return session;
    },
  },
  pages: {
    async api({ req, res }) {
      //Token Session검사를 진행하지 않는 API 따로 작성
      if (req.url === "/user/login") {
        return NextAuth(req, res);
      }
      return NextAuth(req, res);
    },
  },
};

export default NextAuth(authOptions);
