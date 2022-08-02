import { message } from "antd";
import virtualNumberProvider from "data-access/virtual-number-provider";

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
        })
        .catch((e) => {
          message.error(e?.response?.data?.description || "Đăng nhập không thành công");
        });
    },
    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.vngId) {
            virtualNumberProvider
              .put(payload)
              .then(async (s) => {
                resolve(s?.data);
                await dispatch.virtualNumber
                  .updatevirtualNumber(payload)
                  .then((s) => {
                    if (s[0]?.vnNotAdded?.length) {
                      message.error(
                        `Các số ${s[0]?.vnNotAdded.join(
                          ", "
                        )} không được tạo do đã được tạo trước đó`
                      );
                    } else {
                      message.success("Cập nhật thành công dữ liệu");
                    }
                  });
              })
              .catch((e) => {
                message.error(e?.response?.data?.description || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            virtualNumberProvider
              .post(payload)
              .then((s) => {
                if(s?.vnNotAdded?.length) {
                  message.error(
                    `Các số ${s?.vnNotAdded.join(
                      ", "
                    )} không được tạo do đã được tạo trước đó`
                  );
                } else {
                  message.success("Thêm mới thành công dữ liệu");
                  resolve(s?.data);
                }
              })
              .catch((e) => {
                message.error(e?.response?.data?.description || "Xảy ra lỗi, vui lòng thử lại sau");
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
            const data = new Promise((resolve, reject) => {
              return virtualNumberProvider
                .put({
                  customerId,
                  vngId: payload?.vngId,
                  status: payload.status,
                })
                .then((s) => {
                  resolve(s?.data);
                })
                .catch((e) => {
                  message.error(
                    e?.response?.data?.description || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                  reject(e);
                });
            });
            Promise.all([
              dataViettel,
              dataMobi,
              dataVina,
              dataDefault,
              data,
            ]).then((response) => {
              resolve({
                response,
              });
              message.success("Cập nhật thành công dữ liệu");
            });
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

    createVirtualToGroup: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        virtualNumberProvider
          .postVirtual(payload)
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.response?.data?.description || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    updatevirtualNumber: (payload = {}, state) => {
      const body = (payload?.dataVirtualNumbers || []).map((item) => {
        return new Promise((resolve, reject) => {
          let data = {
            id: item?.value,
            status: payload?.isdns?.includes(item.label) ? 1 : 0,
          };
          virtualNumberProvider
            .putVirtual(data)
            .then((s) => {
              resolve(s?.data);
            })
            .catch((e) => {
              reject(e);
            });
        });
      });
      let dataHotline = (payload.isdns || []).filter(
        (x) =>
          !payload?.dataVirtualNumbers
            .map((item) => {
              return item.label;
            })
            .includes(x)
      );
      const dataIp = new Promise((resolve, reject) => {
        let data = {
          vngId: payload.vngId,
          isdns: Array.isArray(dataHotline) ? dataHotline : [dataHotline],
          customerId: payload.customerId,
        };
        virtualNumberProvider
          .postVirtual(data)
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.response?.data?.description || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
      return Promise.all([body, dataIp]).then((response) => {
        return (response || []).filter((x) => x.vnNotAdded);
      });
    },
  }),
};
