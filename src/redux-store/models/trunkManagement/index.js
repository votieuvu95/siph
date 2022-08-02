import { message } from "antd";
import trunkManagementProvider from "data-access/trunk-management-provider";

export default {
  state: {
    listTrunkManagement: [],
    listGroup: []
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getTrunkManagement: () => {
      trunkManagementProvider
        .search()
        .then((s) => {
          dispatch.trunkManagement.updateData({
            listTrunkManagement: s?.groupIps,
          });
        })
        .catch((e) => {
          message.error(e?.response?.data?.description || "Đăng nhập không thành công");
        });
    },
    searchGroup: () => {
      trunkManagementProvider
        .searchGroup()
        .then((s) => {
          dispatch.trunkManagement.updateData({
            listGroup: s?.groups,
          });
        })
        .catch((e) => {
          message.error(e?.response?.data?.description || "Đăng nhập không thành công");
        });
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            trunkManagementProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu");
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.response?.data?.description || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            trunkManagementProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu");
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.response?.data?.description|| "Xảy ra lỗi, vui lòng thử lại sau");
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
