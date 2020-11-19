import myAxios from "@/service/myAxios";

export default {
  async signin(authData: { email: string; password: string; }) {
    try {
      return await myAxios.post('/signin', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      });
    } catch (e) {
      console.log(e)
      console.warn("FAILED SIGNIN! --> but we will pretend everything is OK.")
    }
  }
}
