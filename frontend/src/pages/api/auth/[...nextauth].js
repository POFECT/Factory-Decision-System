import axios from "axios";
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
const { decodeToken } = require("react-jwt");

async function getKeycloakUserInfo(accessToken) {
  try {
    const res = await axios.get('http://localhost:5555/realms/pofect-realm/protocol/openid-connect/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}


async function getUserRoles(accessToken, userId) {
  try {
    const res = await axios.get(`http://localhost:5555/admin/realms/pofect-realm/users/${userId}/role-mappings/realm`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: "pofect",
      clientSecret: "lRu2t5FaIGkbSWc939JxC9yblwbz3qQj",
      issuer: "http://localhost:5555/realms/pofect-realm",
    }),
  ],
  callbacks: {
    async jwt({ token, account,profile }) {
      // // 이전코드
      // if (account) {
      //   console.log("---------account------------");
      //   console.log(account);
      //   console.log("----------user-----------");
      //   token.accessToken = account.access_token;
      //   const userInfo = await getKeycloakUserInfo(token.accessToken);
      //   token.roles = userInfo.roles;
      //   token.permissions = userInfo.permissions;
      //   console.log(user);
      //   console.log("----------profile-----------");
      //   console.log(profile);
      // }
      try {
        if (account) {
          console.log('--------------ACCESS TOKEN ---------------')
          const decodedToken = decodeToken(account.access_token);
          if (token == null){
            throw new Error("Unnable to decode token")
          }
          console.log(decodedToken)
          // 사용자 역할 가져오기
          const userId = decodedToken.preferred_username; // 사용자 ID
          console.log("################ USER ID = "+userId)
          // //const userRoles = await getUserRoles(account.access_token, userId);
          console.log('--------------USER ROLES---------------')
          const userRoles=getUserRoles(account.access_token,userId)
          console.log(userRoles)
          // Do something here to add more info, maybe just overwrite profile (thats the one that should have this info)
          profile = decodedToken;
          token.account = account;
        }
        if (profile) {
          console.log('--------------PROFILE---------------')
          console.log(profile)
          token.profile = profile
          const clientRoles = profile.realm_access.roles;
          token.client_roles = clientRoles;
        }
      } catch (error) {
        console.log(error)
      }
      return token;
    },
    // async session({ session, token }) {
    //   session.accessToken = token.accessToken;
    //   session.permissions = token.permissions;
    //   session.roles = token.roles || []; // 역할 정보 추가, 기본값은 빈 배열
    //   console.log(session);
    //   console.log(session.permissions);
    //   console.log(session.roles);

    //   return session;
    // },
    async session({ session, token, trigger }) {
      // Token interceptor to add token info to the session to use on the pages.
      console.log('async session accessed')

      session.account = token.account;
      session.profile = token.profile;
      session.roles = token.client_roles;
      return session;
    }
  },
  pages: {
    async api({
      req,
      res,
    }) {
      //Token Session검사를 진행하지 않는 API 따로 작성
      if (req.url === "/user/login") { 
        return NextAuth(req, res);
      }
      return NextAuth(req, res);
    },
  },
};

export default NextAuth(authOptions);