import axios from "axios";
import { getToken, setCookie } from "@/utils/cookie";
import store from "@/store";
import router from "@/router";
import storage from "@/utils/storage";
import { Toast } from "vant";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL; //url 앞 path .env 파일에 존재
axios.defaults.headers.post["Content-Type"] = "application/json";

const catchQueue = {};

const service = axios.create({
  /* withCredentials
서버의 자세한 코드까지는 설명하는게 과할거 같아 기본적인 logic만 소개를 하자면, 아이디와 비밀번호가 서버로 넘어오면 유저의 정보가 맞는지 확인한 후에 cookie에 token을 발급하게 됩니다.
  그 후 다른 페이지에서의 인증도 이 token을 통해 이뤄지게 되죠.
  하지만 통신이 아무리 성공적으로 이뤄져 로그인이 성공하더라도 별다른 에러도 없이 인증이 이루어지지 않았습니다.
  확인 결과, cookie에 token 값이 정상적으로 들어가지가 않았습니다.
  같은 origin의 경우 request header 에 cookie가 추가되는데 orgin이 달라지는 경우 자동으로 추가되지 않아 생기는 문제점이었습니다.
  이를 해결하기 위해서는 서버와 클라이언트 둘 다 추가적인 작업이 필요합니다.
  아래 로직 필요 백엔드 에서는 (CORS_ALLOW_CREDENTIALS = True) 코딩 필요*/
  withCredentials: true, // 도메인 간 요청에서 쿠키 정보를 전송할 수 있습니다.
  timeout: 15000, // 요청 시간 제한
});

/**
 * 401 이후 재발행 요청에 대한 사용자 매개변수를 캐시하기 위해 서비스 외부의 계층을 재패키징합니다.
 * @param {*} params 사용자가 전달한 매개변수
 */
const request = (params) => {
  // 할당 요청의 URL 주소
  catchQueue[params.url] = params;
  return service(params);
};

/**
 * request인터셉터
 * @author leeminsu
 * @since 2022.05.08
 * request를 보내기전 storage에 있는 token정보를 header에 말아준다.
 */
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = getToken();
    }
    return config;
  },
  (error) => {
    console.log("error", error);
    Promise.reject(error);
  }
);

/**
 * response인터셉터
 * @author leeminsu
 * @since 2022.05.08
 */
service.interceptors.response.use(
  (response) => {
    // response중 구성
    const {
      config: { url },
    } = response;
    // 요청한 URL 삭제
    delete catchQueue[url];
    const res = response.data;
    // 일시적으로 백그라운드 오류 메시지 추가
    if (res) {
      if (res.code === -1 && res.message) {
        console.log("true111111111111");
        Toast.fail({
          message: res.message,
          icon: "https://img.yzcdn.cn/vant/logo.png",
        });
      }
      return res;
    }
    return Promise.reject("error");
  },
  async (error) => {
    const {
      status,
      config: { url },
    } = error.response;
    console.log("status ==", status);
    switch (
      status // 그 밖의 경우의 추가 처리
    ) {
      case 500:
        delete catchQueue[url];
        Toast.fail({
          message:
            "백그라운드 서비스가 오류를 보고했습니다. 작업이 실패했습니다.",
          icon: "https://img.yzcdn.cn/vant/logo.png",
        });
        break;
      case 400:
        delete catchQueue[url];
        Toast.fail({
          message: "현재 요청에 오류가 있습니다.",
          icon: "https://img.yzcdn.cn/vant/logo.png",
        });
        break;
      case 401:
        router.push("login");
        break;
      case 403:
        delete catchQueue[url];
        Toast.fail({
          message: "요청한 리소스에 액세스할 수 없습니다.",
          icon: "https://img.yzcdn.cn/vant/logo.png",
        });
        logout();
        break;
      case 404:
        delete catchQueue[url];
        Toast.fail({
          message: "요청한 콘텐츠가 존재하지 않습니다",
          icon: "https://img.yzcdn.cn/vant/logo.png",
        });
        break;
    }
  }
);

function logout() {
  storage.del("token");
  setCookie("token", "", -1);
}

export default request;
