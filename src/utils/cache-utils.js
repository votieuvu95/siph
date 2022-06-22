import localForage from "localforage";
var CryptoJS = require("crypto-js");

export default {
  save(userId, key, value, encrypt = true) {
    return new Promise((resolve, reject) => {
      try {
        var data = {
          value,
        };
        data = JSON.stringify(data);
        localForage
          .setItem(userId + "_" + key, data)
          .then((s) => {
            resolve(true);
          })
          .catch((e) => {
            reject(e);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  read(userId, key, defaultValue, encrypt = true) {
    return new Promise((resolve, reject) => {
      localForage
        .getItem(userId + "_" + key)
        .then((item) => {
          try {
            if (item) {
              var data = JSON.parse(item);
              if (data && data.value) {
                resolve(data.value);
              }
            }
            resolve(defaultValue);
          } catch (error) {
            resolve(defaultValue);
          }
        })
        .catch((e) => {
          resolve(defaultValue);
        });
    });
  },
};