import request from "@/utils/request";

// 구내식당 위치정보 가져오기.
export function getMarkerList(data) {
  return request({
    url: "/cafeteria/favorite/list",
    method: "get",
    data,
  });
}
