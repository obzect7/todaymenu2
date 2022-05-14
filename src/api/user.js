import request from "@/utils/request";

// 로그인 및 권한 인터페이스
export function getUserInfo(data) {
  console.log("getUserInfo 이동");
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export function login(data) {
  console.log("login페이지로 이동");
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/auth/logout",
    method: "post",
  });
}

export function linkLogin(data) {
  return request({
    url: "/account/add",
    method: "post",
    data,
  });
}
