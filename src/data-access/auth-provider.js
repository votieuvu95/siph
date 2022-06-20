import { client } from "client/request";
import { LOGIN } from "client/api";

export default {
  login: ({ userName, password }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${LOGIN}`, {
          userName,
          password,
        })
        .then((s) => {
          if (s) {
            resolve(s?.data);
          } else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
