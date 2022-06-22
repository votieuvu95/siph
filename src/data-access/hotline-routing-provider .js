import { client } from "client/request";
import { HOTLINE, CUSTOMER } from "client/api";

export default {
  search: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${HOTLINE}`)
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
        .post(`${CUSTOMER}/${customerId}/hotline-group`, rest)
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
  put: ({ customerId, hotlineGroupId, ...rest }) => {
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
  createTrunkToHotline: ({ customerId, hotlineGroupId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(
          `${CUSTOMER}/${customerId}/hotline-group/${hotlineGroupId}/trunk`,
          rest
        )
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
  putTrunkToHotline: ({ customerId, hotlineGroupId, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(
          `${CUSTOMER}/${customerId}/hotline-group/${hotlineGroupId}`,
          rest
        )
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
