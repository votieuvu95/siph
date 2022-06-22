import { message } from "antd";
import customerProvider from "data-access/customer-provider";

export default {
  state: {
    listCustomer: [],
    listGroup: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getCustomer: () => {
      customerProvider
        .search()
        .then( (s) => {
          localStorage.setItem("DATA_ALL_CUSTOMER", JSON.stringify(s?.customers));
        })
        .catch((e) => {
          message.error(e?.message || "Đăng nhập không thành công");
        });
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            customerProvider
              .put(payload)
              .then((s) => {
                dispatch.customer.updateWhitelist(payload);
                message.success("Cập nhật thành công dữ liệu");
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            customerProvider
              .post(payload)
              .then((s) => {
                let data = {
                  customerId: s?.customerId,
                  ips: payload.ips,
                };
                dispatch.customer.createWhitelist(data);
                message.success("Thêm mới thành công dữ liệu");
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    createWhitelist: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        customerProvider
          .postWhitelist(payload)
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    updateWhitelist: (payload = {}, state) => {
      const body = (payload?.dataIp || []).map((item) => {
        return new Promise((resolve, reject) => {
          let data = {
            whitelistId: item?.value,
            customerId: payload.id,
            status: payload?.ips?.includes(item.label) ? 1 : 0,
          };
          customerProvider
            .putWhitelist(data)
            .then((s) => {
              resolve(s?.data);
            })
            .catch((e) => {
              reject(e);
            });
        });
      });
      let ips = (payload?.ips || []).filter(
        (x) =>
          !payload.dataIp
            .map((item) => {
              return item.label;
            })
            .includes(x)
      );
      const bodyIp = new Promise(() => {
        let data = {
          customerId: payload.id,
          ips: Array.isArray(ips) ? ips : [ips],
        };
        dispatch.customer.createWhitelist(data);
      });
      Promise.all([body, bodyIp]).then(() => {});
    },
  }),
};
