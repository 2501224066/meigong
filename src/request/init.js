import Taro from "@tarojs/taro";

// axios 使用 data 的 请求方式
const dataForMethod = ["POST", "PUT", "post", "put"];

// axios 使用 params 的 请求方式
const paramsForMethod = ["GET", "DETELE", "get", "detele"];

// 默认请求失败提示
const defaultFailMsg = "请求失败";

const head = "https://gy.970209.xyz/";

// 发送请求
export function send(obj) {
  let model = {
    method: obj.method,
    url: head + obj.url,
    data: dataForMethod.indexOf(obj.method) > -1 ? obj.data : null,
    params: paramsForMethod.indexOf(obj.method) > -1 ? obj.data : null,
    responseType: obj.responseType,
  };
  return new Promise(async (resolve) => {
    const res = await Taro.request(model);
    if (res.data instanceof Blob) {
      // 判断是否为 Blob 对象
      resolve(res);
    } else if (res.data.code === 200) {
      // 请求是否成功
      resolve(res.data);
    } else if (res.data.code === "ERROR") {
      // 接口返回错误信息
      Taro.atMessage({
        message: res.data.msg || defaultFailMsg,
        type: "error",
      });
    } else {
      // 提示错误信息
      Taro.atMessage({
        message: defaultFailMsg,
        type: "error",
      });
    }
  });
}
