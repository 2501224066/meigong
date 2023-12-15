import { send } from "./init";

// banner
export function banner(data, repair = "", responseType = "") {
  return send({
    method: "get",
    url: "api/banner/get-list" + repair,
    data,
    responseType,
  });
}

// 分类
export function classify(data, repair = "", responseType = "") {
  return send({
    method: "get",
    url: "api/category/get-list" + repair,
    data,
    responseType,
  });
}

// 设计师
export function man(data, repair = "", responseType = "") {
  return send({
    method: "get",
    url: "api/designer/get-list" + repair,
    data,
    responseType,
  });
}

// 设计师详情
export function manDetail(data, repair = "", responseType = "") {
  return send({
    method: "get",
    url: "api/designer/get-detail" + repair,
    data,
    responseType,
  });
}

// 设计师下作品集
export function work(data, repair = "", responseType = "") {
  return send({
    method: "get",
    url: "api/portfolio/get-list" + repair,
    data,
    responseType,
  });
}

// 设计师下评价
export function comment(data, repair = "", responseType = "") {
  return send({
    method: "get",
    url: "api/comment/get-list" + repair,
    data,
    responseType,
  });
}
