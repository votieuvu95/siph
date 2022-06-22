import { message } from "antd";
import hotlineProvider from "data-access/hotline-routing-provider ";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    listCustomer: [],
    listHotlines: [],
    listGroup: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getHotline:  () => {
      return new Promise((resolve, reject) => {
        hotlineProvider
        .search()
        .then( (s) => {
          dispatch.hotline.updateData({
            listHotlines: s?.hotlineGroups,
          });
           cacheUtils.save("", "DATA_ALL_HOTLINE", s?.hotlineGroups, false);
           resolve(s?.hotlineGroups)
        })
        .catch((e) => {
          message.error(e?.message || "Đăng nhập không thành công");
        });
      })
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.hotlineGroupId) {
            hotlineProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu");
                resolve(s?.data);
                dispatch.hotline.getHotline();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            hotlineProvider
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
    createOrEditTrunkToHotline: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            hotlineProvider
              .putTrunkToHotline(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu");
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            hotlineProvider
              .createTrunkToHotline(payload)
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
