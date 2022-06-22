import { message } from "antd";
import customerProvider from "data-access/customer-provider";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    listCustomer: [],
    listGroup: []
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
        .then(async (s) => {
          await cacheUtils.save("", "DATA_ALL_CUSTOMER", s?.customers, false);
          dispatch.customer.updateData({
            listCustomer: s?.customers,
          });
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
  }),
};
