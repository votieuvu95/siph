import { client } from "client/request";
import { CUSTOMER } from "client/api";

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
  put: ({ id, ...rest }) => {
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
  postWhitelist: ({ customerId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${CUSTOMER}/${customerId}/whitelist-ip`, rest)
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
  putWhitelist: ({ customerId, whitelistId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${CUSTOMER}/${customerId}/whitelist-ip/${whitelistId}`, rest)
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
  postHotlineGroup: ({ customerId, hotlineGroupId, ...rest }) => {
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
  putHotlineGroup: ({ customerId, hotlineGroupId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${CUSTOMER}/${customerId}/hotline-group/${hotlineGroupId}`, rest)
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
