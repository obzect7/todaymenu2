<template>
  <div>
    <van-form class="cell">
      <van-cell-group :title="login.loginName">
        <van-cell title="ID" :value="user.userid" />
        <van-cell title="NAME" :value="user.usernm" />
      </van-cell-group>
      <van-cell-group title="Setting">
        <van-cell is-link replace :title="login.LoginYn" @click="GoLogin" />
      </van-cell-group>
    </van-form>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import storage from "@/utils/storage";

export default {
  name: "MyPage",
  components: {
    NavBar,
  },
  data() {
    return {
      login: { loginName: "", LoginYn: "" },
      user: { userid: "", usernm: "", socialCd: "" },
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
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      document.head.appendChild(script);
    }

    // GOOGLE SCRIPT 추가
    // GOOGLE clientId:418417431995-j034idlo8a80g23dgtekii0lujm58blm.apps.googleusercontent.com
    if (!window.gapi) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/client.js?onload=load";
      document.head.appendChild(script);
    }
  },
  created() {
    if (storage.get("UserInfo")) {
      this.user = storage.get("UserInfo");
      this.login.loginName = "Log in (로그인 완료)";
      this.login.LoginYn = "로그아웃";
    } else {
      this.login.loginName = "Log out (로그인 해주세요.)";
      this.login.LoginYn = "로그인";
    }
  },
  methods: {
    GoLogin() {
      if (!storage.get("Authorization")) {
        this.$router.replace("/login");
      } else {
        this.$store
          .dispatch("LogOut")
          .then(() => {
            console.log("로그아웃 진행");
            if (this.user.socialCd == "KAKAO") {
              window.Kakao.API.request({
                url: "/v1/user/unlink",
                success: function (response) {
                  console.log(response);
                },
                fail: function (error) {
                  console.log(error);
                },
              });
            } else if (this.user.socialCd == "NAVER") {
              /*  NAVER LOGOUT은 API 지원안함
               *  http://nid.naver.com/nidlogin.logout 해당 URL 팝업으로 띄우고 난뒤에 로그인 하면 로그아웃됨을 확인됨
               *  차후에 개발 진행 예정
               */
            } else if (this.user.socialCd == "GOOGLE") {
              const auth2 = window.gapi.auth2.getAuthInstance();
              auth2.signOut().then(function () {
                console.log("google user logout");
              });
              auth2.disconnect();
            }
            this.$router.go(); // 페이지 새로고침
          })
          .catch((error) => {
            // 오류 메시지, 구성 요소 프롬프트
            this.$toast({ message: error, duration: 1000 });
          });
      }
    },
  },
};
</script>

<style scoped></style>
