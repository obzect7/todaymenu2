import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import store from "@/store";
import storage from "@/utils/storage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () =>
      import(/* webpackChunkName: "Home" */ "@/views/Favorite.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: "/myPage",
    name: "myPage",
    component: () =>
      import(/* webpackChunkName: "Home" */ "@/views/Favorite.vue"),
    meta: {
      index: 1,
      requireAuth: true, // 이 필드가 있는 경우 이 라우팅 페이지에 로그인 권한이 필요함.
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

/* to : 이동할 url
from : 현재 url
next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
전역 라우팅 가드(java의 interceptor 와 동일한 기능을 함
url 참조 https://joshua1988.github.io/web-development/vuejs/vue-router-navigation-guards/ */
router.beforeEach((to, from, next) => {
  console.log("next page 작동중", to);
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  // Vuex의 상태가 라우팅 점프 과정에서 손실될 경우를 대비하여 다시 점프하기 전에 저장하십시오.
  store.commit("SET_TOKEN", storage.get("Authorization"));
  if (to.meta.requireAuth) {
    // 로컬 캐시에서 직접 판단하지 않고 Vuex의 속성 상태로 판단
    if (store.state.user.token) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
