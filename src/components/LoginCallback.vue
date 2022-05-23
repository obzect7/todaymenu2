<template>
  <div></div>
</template>

<script>
export default {
  name: "LoginCallback",
  data() {
    return {
      linkUser: {
        userid: "",
        password: "",
        usernm: "",
        socialCd: "",
      },
    };
  },
  mounted() {
    // NAVER script 추가
    // NAVER clientId: "hHO9u91fGldJw96AkMO9"
    if (window.naver) {
      this.initNaver();
    } else {
      const script = document.createElement("script");
      script.onload = () => this.initNaver();
      script.src =
        "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js";
      document.head.appendChild(script);
    }
  },
  methods: {
    initNaver() {
      const that = this;
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: "hHO9u91fGldJw96AkMO9",
        isPopup: false,
      });
      naverLogin.init();
      naverLogin.getLoginStatus(function (status) {
        if (status) {
          // 1. user 정보 불러오기
          that.linkUser.socialCd = "NAVER";
          that.linkUser.userid = naverLogin.user.getId();
          that.linkUser.usernm = naverLogin.user.getName();
          that.linkUser.password = naverLogin.user.getId();
          console.log(that.linkUser);
          // 2. 불러온 정보 login axios 태우기
          that.$store
            .dispatch("LinkLogin", that.linkUser)
            .then(() => {
              // 3. redirect
              that.$router.replace({ path: "/home" });
            })
            .catch((error) => {
              that.$toast({ message: error, duration: 1000 });
              that.$router.replace({ path: "/login" });
            });
        } else {
          console.log("AccessToken이 올바르지 않습니다.");
          that.$router.replace({ path: "/login" });
        }
      });
    },
  },
};
</script>
<style scoped></style>
