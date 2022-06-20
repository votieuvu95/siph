import { client } from "client/request";
import { GROUP } from "client/api";

export default {
  search: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${GROUP}/*/ip`)
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
  post: ({ groupCode, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${GROUP}/${groupCode}/ip`, rest)
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
  put: ({ groupCode, id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${GROUP}/${groupCode}/ip/${id}`, rest)
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
  searchGroup: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${GROUP}`)
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
