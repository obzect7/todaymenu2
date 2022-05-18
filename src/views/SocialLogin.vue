<template>
  <div style="text-align: center; margin: auto">
    <div class="iconDisplay" id="naverIdLogin"></div>
    <div class="iconDisplay">
      <img src="@/assets/kakaolink_btn_small.png" @click="LoginKakao" />
    </div>
    <div class="iconDisplay">
      <img
        src="https://developers.google.com/identity/images/g-logo.png?hl=ko"
      />
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
  },
  methods: {
    initNaver() {
      this.naverLogin = new window.naver.LoginWithNaverId({
        clientId: "hHO9u91fGldJw96AkMO9",
        callbackUrl: "http://localhost:8080/home",
        isPopup: false,
        loginButton: { color: "green", type: 1, height: 50 },
      });
      this.naverLogin.init();
      console.log(this.naverLogin.loginStatus);
      window.addEventListener("load", function () {
        this.naverLogin.getLoginStatus(function (status) {
          if (status) {
            return this.NaverLogin();
          }
        });
      });
    },
    initKakao() {
      window.Kakao.init("189e2e7c7209beba298cd8597728347e");
    },
    //KAKAO LOGIN
    LoginKakao() {
      let that = this;
      window.Kakao.Auth.loginForm({
        success: function (authObj) {
          window.Kakao.Auth.setAccessToken(authObj.access_token);
          // 사용자 정보 받아오기
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
              that.$store
                .dispatch("LinkLogin", that.linkUser)
                .then(() => {
                  that.$router.replace({ path: "/home" });
                })
                .catch((error) => {
                  // 오류 메시지, 구성 요소 프롬프트
                  that.$toast({ message: error, duration: 1000 });
                  console.log(error);
                });
            },
            fail: function (error) {
              console.log(error);
            },
          });
        },
        fail: function (err) {
          alert(JSON.stringify(err));
        },
      });
    },
    NaverLogin() {
      alert("네이버 로그인 완료");
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
