// 創造一個服務的物件，可以用在register-component來襙做。
// 扮演一種服霧器的腳色

import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    // 登出直接把本地儲存的webtoken刪除，就無法操作登入
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    //axios post 需要變成(網址{需要的參數})，這樣的形式包起來。
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
