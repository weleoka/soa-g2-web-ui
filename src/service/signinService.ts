import httpAxios from "@/service/httpAxios";

interface AuthObj {
  userEmail: string;
  userId: string;
  tokenId: string;
}

export default {
  async signin(authData: { email: string; password: string }) {
    const debug = true;
    try {
      const res = await httpAxios.post("/signin", {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      });
      const authObj: AuthObj = {
        userEmail: authData.email,
        userId: res.data.userId,
        tokenId: res.data.tokenId
      };
      return authObj;
    } catch (e) {
      console.log("FAILED SIGNIN!" + e);
      if (debug) {
        console.log("--> but we will pretend everything is OK.");
        const authObj: AuthObj = {
          userEmail: authData.email,
          userId: "aSpecialUserID",
          tokenId: "aSpecialTokenId"
        };
        return authObj;
      }
    }
  }
};
