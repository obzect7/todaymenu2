<!--
      kakao  : login.vue -> login.vue(checking) -> home.vue
      google : login.vue -> login.vue(checking) -> home.vue
      naver  : login.vue -> loginCallback.vue(checking) -> home.vue

      [issue]
      - naver/google 이 화면 렌더링시 스크립트 들고오기전에 렌더링 되서 스크립트 에러 떠서 변경함
-->
<template>
  <div style="text-align: center; margin: auto">
    <!-- naver
         * 가짜 이미지 클릭후 진짜 naverloginbutton 렌더링후 자동 클릭-->
    <div id="naverIdLogin" ref="naverLoginButton" style="display: none"></div>
    <div class="iconDisplay">
      <img
        src="https://static.nid.naver.com/oauth/button_g.PNG?version=js-2.0.1"
        @click="initNaver"
      />
    </div>
    <!-- kakao -->
    <div class="iconDisplay">
      <img src="@/assets/kakaolink_btn_small.png" @click="LoginKakao" />
    </div>
    <!-- google
         * 가짜 이미지 클릭후 진짜 googleloginbutton 렌더링후 자동 클릭
         * interval 함수 사용해서 click 되게 대처함 -->
    <div id="my-sign" ref="googleLoginButton" style="display: none"></div>
    <div class="iconDisplay">
      <img src="@/assets/g-logo.png" @click="initGoogle" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialLogin",
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
    if (!window.naver) {
      const script = document.createElement("script");
      script.src =
        "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js";
      document.head.appendChild(script);
    }

    // KAKAO SCRIPT 추가
    // KAKAO APIKEY:189e2e7c7209beba298cd8597728347e
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.onload = () => this.initKakao();
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      document.head.appendChild(script);
    } else {
      this.initKakao();
    }

    // GOOGLE SCRIPT 추가 (checking 하는 로직 에러나서 무조건 넣는 것으로 변경)
    // GOOGLE clientId:418417431995-j034idlo8a80g23dgtekii0lujm58blm.apps.googleusercontent.com
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    document.head.appendChild(script);

    const script2 = document.createElement("script");
    script2.src = "https://apis.google.com/js/client.js";
    document.head.appendChild(script2);
  },
  methods: {
    initNaver() {
      // 1. naver client id setting & button create
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: "hHO9u91fGldJw96AkMO9",
        callbackUrl: "http://localhost:8080/LoginCallback",
        isPopup: false,
        loginButton: { color: "green", type: 1, height: 50 },
      });
      naverLogin.init();
      // 2. naver button 자동 클릭
      this.$refs.naverLoginButton.children[0].click();
    },
    initKakao() {
      // 1. kakao apikey setting
      window.Kakao.init("189e2e7c7209beba298cd8597728347e");
    },
    initGoogle() {
      // 1. google client key setting
      window.gapi.client.init({
        clientId:
          "418417431995-j034idlo8a80g23dgtekii0lujm58blm.apps.googleusercontent.com",
        scope: "profile email",
        plugin_name: "ohme",
      });

      // 2. google login button create
      window.gapi.signin2.render("my-sign", {
        scope: "profile email",
        width: 50,
        height: 50,
        onsuccess: this.LoginGoogle,
        onfailure: () => console.log("fail"),
      });

      // 3. google rendering 후에 버튼 자동 클릭되게 interval setting 해줌
      this.google_func = setInterval(() => {
        if (this.$refs.googleLoginButton.children[0] !== undefined) {
          console.log(this.$refs.googleLoginButton.children[0].click());
          clearInterval(this.google_func);
        }
      }, 500);
    },
    LoginKakao() {
      let that = this;
      window.Kakao.Auth.loginForm({
        success: function (authObj) {
          window.Kakao.Auth.setAccessToken(authObj.access_token);
          // 1. user 정보 불러오기
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: function (result) {
              that.linkUser.socialCd = "KAKAO";
              that.linkUser.userid = result.id;
              that.linkUser.password = result.id;
              that.linkUser.usernm = !result.properties.nickname
                ? result.id
                : result.properties.nickname;
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
                  console.log(error);
                });
            },
            fail: (error) => console.log(error),
          });
        },
        fail: (error) => console.log(error),
      });
    },
    LoginGoogle(googleUser) {
      // 1. user 정보 불러오기
      this.linkUser.socialCd = "GOOGLE";
      this.linkUser.userid = googleUser.getBasicProfile().getId();
      this.linkUser.usernm = googleUser.getBasicProfile().getName();
      this.linkUser.password = googleUser.getBasicProfile().getId();
      console.log(this.linkUser);
      // 2. 불러온 정보 login axios 태우기
      this.$store
        .dispatch("LinkLogin", this.linkUser)
        .then(() => {
          // 3. redirect
          this.$router.replace({ path: "/home" });
        })
        .catch((error) => {
          this.$toast({ message: error, duration: 1000 });
          console.log(error);
        });
    },
  },
};
</script>

<style>
.iconDisplay {
  display: inline-block;
  flat: left;
  margin: 5px;
}
img {
  height: 50px;
}
</style>
