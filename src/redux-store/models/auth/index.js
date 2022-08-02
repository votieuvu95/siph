import { message } from "antd";
import authProvider from "data-access/auth-provider";

export default {
  state: {
    auth: (() => {
      try {
        let data = localStorage.getItem("auth") || "";
        if (data) return JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
      return null;
    })(),
    thongTinTaiKhoan : {}
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onLogin: ({ userName, password }) => {
      dispatch.auth.updateData({
        auth: null,
      });
      return new Promise((resolve, reject) => {
        authProvider
          .login({
            userName,
            password,
          })
          .then((s) => {
            localStorage.setItem("auth", JSON.stringify(s));
            localStorage.setItem("checkLogin", true);
            dispatch.auth.updateData({
              auth: s,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.response?.data?.description || "Đăng nhập không thành công");
            reject(e);
          });
      });
    },
    onLogout: () => {
      localStorage.removeItem("auth");
      dispatch.auth.updateData({
        auth: null,
      });
    },
  }),
};
