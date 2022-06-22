import { client } from "client/request";
import {  CUSTOMER } from "client/api";

export default {
  search: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${CUSTOMER}`)
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
  post: ({ customerId, hotlineGroupId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${CUSTOMER}`, rest)
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
  put: ({  id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${CUSTOMER}/${id}`, rest)
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
