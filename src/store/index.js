import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import getters from "./getters";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters,
});
/* // 리스너는 변이를 호출할 때마다 이 메서드를 입력한 다음 vuex에서 상태 정보의 지속성과 같은 일부 처리를 수행합니다.
store.subscribe((mutations, state) => {
}) */
export default store;
