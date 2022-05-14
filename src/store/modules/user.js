import storage from "@/utils/storage";
import { setCookie } from "@/utils/cookie";
import { getUserInfo, logout } from "@/api/user.js";

const user = {
  state: {
    token: storage.get("Authorization"),
    user: {},
    avatar: "",
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      storage.set("Authorization", token);
      // 토큰은 새로고침 후 localstorage 정보가 손실되는 것을 방지하기 위해 쿠키에 저장됩니다.
      setCookie("Authorization", token);
    },
    SET_USER_INFO: (state, user) => {
      state.user = user;
      storage.set("UserInfo", user);
    },
  },

  actions: {
    // 로그인 판단
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        getUserInfo(userInfo)
          .then((response) => {
            console.log("response==", response);
            if (response.code === 200 && response.data) {
              console.log("@@@@@@@@@@@@@@", response.data);
              commit("SET_TOKEN", response.data.token);
              commit("SET_USER_INFO", response.data.user);
              resolve();
            }
          })
          .catch((error) => {
            console.log("error===", error);
            reject(error);
          });
      });
    },
    // 정상적으로 종료
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_USER_INFO", "");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /* // 사용자 정보 가져오기
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
 */
    /*
    // 토큰 오류 종료
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        auth.clearToken()
        resolve()
      })
    } */
  },
};

export default user;
