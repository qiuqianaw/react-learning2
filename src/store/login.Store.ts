import { makeAutoObservable } from "mobx";
import { http } from "@/utils";
// login module
class LoginStore {
  token = "";
  constructor() {
    // 响应式
    makeAutoObservable(this);
  }
  getToken = async ({ mobile, code }) => {
    // 调用登陆接口
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    // 存入token
    this.token = res.data.token;
  };
}

export default LoginStore;
