import request from "@/utils/request";

// 찜한 식당정보 list.
export function getFavoriteList(data) {
  return request({
    url: "/cafeteria/favorite/list",
    method: "post",
    data,
  });
}

// 전체 마커 정보 가져오기
export function getMarkerList(data) {
  return request({
    url: "/cafeteria/getAllMarkerList",
    method: "get",
    data,
  });
}
