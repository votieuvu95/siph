import { client } from "client/request";
import {  VIRTUALNUMBER, CUSTOMER } from "client/api";

export default {
  search: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${VIRTUALNUMBER}`)
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
  post: ({ customerId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${CUSTOMER}/${customerId}/virtual-number-group`, rest)
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
  put: ({ customerId, vngId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${CUSTOMER}/${customerId}/virtual-number-group/${vngId}`, rest)
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
  postTrunk: ({ customerId, vngId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${CUSTOMER}/${customerId}/virtual-number-group/${vngId}/trunk`, rest)
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
  putTrunk: ({ customerId, vngtId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${CUSTOMER}/${customerId}/virtual-number-group-trunk/${vngtId}`, rest)
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
