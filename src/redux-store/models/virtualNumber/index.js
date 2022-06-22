import { message } from "antd";
import virtualNumberProvider from "data-access/virtual-number-provider";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    listVirtualNumber: [],
    listHotlines: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getVirtualNumber: () => {
      virtualNumberProvider
        .search()
        .then((s) => {
          dispatch.virtualNumber.updateData({
            listVirtualNumber: s?.virtualNumberGroups,
          });
          cacheUtils.save(
            "",
            "DATA_ALL_VITURALNUMBER",
            s?.virtualNumberGroups,
            false
          );
        })
        .catch((e) => {
          message.error(e?.message || "Đăng nhập không thành công");
        });
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.vngId) {
            virtualNumberProvider
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
            virtualNumberProvider
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
    createOrEditToTrunk: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.vngTrunks) {
            const {
              customerId,
              viettelTrunkId,
              mobiTrunkId,
              vinaTrunkId,
              defaultTrunkId,
              virtualGroupId,
              vngTrunks,
            } = payload;

            const dataViettel = new Promise((resolve, reject) => {
              const body = (vngTrunks || []).filter(
                (x) => x.groupCode === "11"
              );
              (body || []).map((item) => {
                return virtualNumberProvider
                  .putTrunk({
                    customerId,
                    vngtId: item?.vngtId,
                    trunkId: viettelTrunkId,
                  })
                  .then((s) => {
                    resolve(s?.data);
                  })
                  .catch((e) => {
                    reject(e);
                  });
              });
            });

            const dataMobi = new Promise((resolve, reject) => {
              const body = (vngTrunks || []).filter(
                (x) => x.groupCode === "22"
              );
              (body || []).map((item) => {
                return virtualNumberProvider
                  .putTrunk({
                    customerId,
                    vngtId: item?.vngtId,
                    trunkId: mobiTrunkId,
                  })
                  .then((s) => {
                    resolve(s?.data);
                  })
                  .catch((e) => {
                    reject(e);
                  });
              });
            });

            const dataVina = new Promise((resolve, reject) => {
              const body = (vngTrunks || []).filter(
                (x) => x.groupCode === "33"
              );
              (body || []).map((item) => {
                return virtualNumberProvider
                  .putTrunk({
                    customerId,
                    vngtId: item?.vngtId,
                    trunkId: vinaTrunkId,
                  })
                  .then((s) => {
                    resolve(s?.data);
                  })
                  .catch((e) => {
                    reject(e);
                  });
              });
            });

            const dataDefault = new Promise((resolve, reject) => {
              const body = (vngTrunks || []).filter(
                (x) => x.groupCode === "44"
              );
              (body || []).map((item) => {
                return virtualNumberProvider
                  .putTrunk({
                    customerId,
                    vngtId: item?.vngtId,
                    trunkId: defaultTrunkId,
                  })
                  .then((s) => {
                    resolve(s?.data);
                  })
                  .catch((e) => {
                    reject(e);
                  });
              });
            });

            Promise.all([dataViettel, dataMobi, dataVina, dataDefault]).then(
              (response) => { resolve({
                response,
              });
                message.success("Cập nhật thành công dữ liệu");
              }
            );
          } else {
            const {
              customerId,
              viettelTrunkId,
              mobiTrunkId,
              vinaTrunkId,
              defaultTrunkId,
              virtualGroupId,
            } = payload;
            Promise.all(
              [viettelTrunkId, mobiTrunkId, vinaTrunkId, defaultTrunkId].map(
                (item) => {
                  let data = {
                    trunkId: item,
                    customerId,
                    vngId: virtualGroupId,
                  };
                  return virtualNumberProvider
                    .postTrunk(data)
                    .then((s) => {
                      resolve(s?.data);
                    })
                    .catch((e) => {
                      reject(e);
                    });
                }
              )
            ).then(() => {
              message.success("Tạo mới  thành công dữ liệu");
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