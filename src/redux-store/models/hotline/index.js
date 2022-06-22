import { message } from "antd";
import hotlineProvider from "data-access/hotline-routing-provider ";

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
    getHotline: () => {
      return new Promise((resolve, reject) => {
        hotlineProvider
          .search()
          .then((s) => {
            dispatch.hotline.updateData({
              listHotlines: s?.hotlineGroups,
            });
            resolve(s?.hotlineGroups);
            localStorage.setItem("DATA_ALL_HOTLINE", JSON.stringify(s?.hotlineGroups));
          })
          .catch((e) => {
            message.error(e?.message || "Đăng nhập không thành công");
          });
      });
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.hotlineGroupId) {
            hotlineProvider
              .put(payload)
              .then((s) => {
                dispatch.hotline.updateHotline(payload);
                message.success("Cập nhật thành công dữ liệu");
                resolve(s?.data);
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

    createHotlineGroup: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        hotlineProvider
          .postHotlineGroup(payload)
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    putHotline: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        hotlineProvider
          .putHotline(payload)
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    updateHotline: (payload = {}, state) => {
      const body = (payload?.dataHotlines || []).map((item) => {
        return new Promise((resolve, reject) => {
          let data = {
            id: item?.value,
            status: payload?.isdns?.includes(item.label) ? 1 : 0,
          };
          hotlineProvider
            .putHotline(data)
            .then((s) => {
              resolve(s?.data);
            })
            .catch((e) => {
              reject(e);
            });
        });
      });
      let dataHotline = (payload.isdns || []).filter((x) =>
        !payload?.dataHotlines
          .map((item) => {
            return item.label;
          })
          .includes(x)
      );
      const dataIp = new Promise(() => {
        let data = {
          customerId: payload.customerId,
          isdns: Array.isArray(dataHotline) ? dataHotline : [dataHotline],
          hotlineGroupId: payload.hotlineGroupId,
        };
        dispatch.hotline.createHotlineGroup(data);
      });
      Promise.all([body, dataIp]).then(() => {});
    },
  }),
};
