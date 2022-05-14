import Vue from "vue";
import App from "./App";
import router from "./router";
import Router from "vue-router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import naver from "vue-naver-maps";
import VueGeolocationApi from "vue-geolocation-api";

//use 한다는 것은 전역 변수로 쓰겠다는 것과 비슷한 느낌임.
Vue.use(Vant)
  .use(naver, {
    clientID: "e0hzk12pzn",
    useGovAPI: false, //공공 클라우드 API 사용 (선택)
    subModules: "", // 서브모듈 (선택)
  })
  .use(router)
  .use(VueGeolocationApi);

/**
 * main.js
 * @author leeminsu
 * @since 2022.05.13
 */
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
