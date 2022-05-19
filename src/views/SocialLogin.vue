<template>
  <div style="text-align: center; margin: auto">
    <div class="iconDisplay" id="naverIdLogin"></div>
    <div class="iconDisplay">
      <img src="@/assets/kakaolink_btn_small.png" @click="LoginKakao" />
    </div>
    <div class="iconDisplay" id="my-sign"></div>
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
    if (window.naver) {
      this.initNaver();
    } else {
      const script = document.createElement("script");
      script.onload = () => this.initNaver();
      script.src =
        "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js";
      document.head.appendChild(script);
    }

    // KAKAO SCRIPT 추가
    // KAKAO APIKEY:189e2e7c7209beba298cd8597728347e
    if (window.Kakao) {
      this.initKakao();
    } else {
      const script = document.createElement("script");
      script.onload = () => this.initKakao();
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      document.head.appendChild(script);
    }

    // GOOGLE SCRIPT 추가
    // GOOGLE clientId:418417431995-j034idlo8a80g23dgtekii0lujm58blm.apps.googleusercontent.com
    if (window.gapi) {
      if (window.gapi.client) {
        window.gapi.load("client", this.initGoogle());
      } else {
        const script2 = document.createElement("script");
        script2.onload = () => window.gapi.load("client", this.initGoogle());
        script2.src = "https://apis.google.com/js/client.js?onload=load";
        document.head.appendChild(script2);
      }
    } else {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/platform.js";
      document.head.appendChild(script);

      console.log(window.gapi.client);
      if (window.gapi.client) {
        window.gapi.load("client", this.initGoogle());
      } else {
        const script2 = document.createElement("script");
        script2.onload = () => window.gapi.load("client", this.initGoogle());
        script2.src = "https://apis.google.com/js/client.js?onload=load";
        document.head.appendChild(script2);
      }
    }
  },
  methods: {
    initNaver() {
      // 1. naver client id setting
      this.naverLogin = new window.naver.LoginWithNaverId({
        clientId: "hHO9u91fGldJw96AkMO9",
        callbackUrl: "http://localhost:8080/home",
        isPopup: false,
        loginButton: { color: "green", type: 1, height: 50 },
        callbackHandle: false,
      });

      console.log(this.naverLogin);

      this.naverLogin.init();
      window.addEventListener("load", () => {
        this.naverLogin.getLoginStatus(function (status) {
          if (status) {
            this.NaverLogin();
          }
        });
      });
    },
    initKakao() {
      // kakao apikey setting
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
    NaverLogin() {
      alert("네이버 로그인 완료");
    },
    LoginGoogle(googleUser) {
      // 1. user 정보 불러오기
      this.linkUser.socialCd = "GOOGLE";
      this.linkUser.userid = googleUser.getBasicProfile().getId();
      this.linkUser.usernm = googleUser.getBasicProfile().getName();
      this.linkUser.password = googleUser.getBasicProfile().getId();
      console.log(this.linkUser);
      // 2. 불러온 정보 login axios 태우기
      /*
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
       */
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
