<template>
  <div class="content">
    <van-form class="login-form" @submit.prevent="handleLogin">
      <img src="@/assets/splashScreen.png" alt="" />
      <van-cell-group inset class="login-info">
        <van-field
          v-model.trim="user.userid"
          required
          clearable
          label="사용자ID"
          placeholder="사용자ID를 입력하십시오"
        />
        <van-field
          v-model.trim="user.password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력 해주세요"
          right-icon="question-o"
          required
          clearable
          autocomplete
          @click-right-icon="$toast('비밀번호를 잊으셨나요?')"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round type="primary" size="large" @click="handleLogin">
          Login
        </van-button>
      </div>
      <div style="margin: 16px">
        <van-button plain round type="primary" size="large" router to="/SignUp">
          Sign Up
        </van-button>
      </div>
    </van-form>
    <van-form class="syncLogin">
      <div style="margin: 16px">
        <van-button
          color="#fef01b"
          round
          block
          type="primary"
          native-type="submit"
          @click="kakaoLogin"
        >
          카카오톡 계정으로 로그인
        </van-button>
      </div>
      <div style="margin: 16px">
        <van-button
          color="#2db400"
          round
          block
          type="primary"
          native-type="submit"
          @click="NaverLogin"
        >
          네이버 계정으로 로그인
        </van-button>
      </div>
      <div style="margin: 16px">
        <van-button
          color="#f3f3f3"
          round
          block
          type="primary"
          native-type="submit"
        >
          구글 계정으로 로그인
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import storage from "@/utils/storage";
export default {
  data() {
    return {
      user: { userid: "", password: "" },
    };
  },
  created() {
    if (storage.get("UserInfo")) {
      this.user = storage.get("UserInfo");
    }
  },
  methods: {
    // 로그인 기능
    handleLogin() {
      if (this.user.userid === "") {
        this.$toast({ message: "사용자 이름을 입력하세요.", duration: 1000 });
        return false;
      }
      if (this.user.password === "") {
        this.$toast({ message: "비밀번호를 입력하세요", duration: 1000 });
        return false;
      }
      this.$store
        .dispatch("Login", this.user)
        .then(() => {
          console.log("22222222222@@@@@@@@");
          console.log("this.$router.query.redirect==", this.$router);

          this.$router.replace({ path: "/home" });
        })
        .catch((error) => {
          // 오류 메시지, 구성 요소 프롬프트
          this.$toast({ message: error, duration: 1000 });
        });
    },
    // 카카오 로그인
    kakaoLogin() {
      window.Kakao.Auth.login({
        success: function (authObj) {
          console.log(authObj);
          window.Kakao.Auth.setAccessToken(authObj.access_token);
          window.Kakao.API.request({
            url: "/v2/user/me",
            data: {
              property_keys: ["kakao_account.email", "kakao_account.gender"],
            },
            success: function (result) {
              console.log(result);
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
      console.log("카카오 토큰 코드", window.Kakao.Auth.getAccessToken());
      window.Kakao.Auth.logout(function () {
        console.log(window.Kakao.Auth.getAccessToken());
      });
    },
  },
};
</script>

<style scoped>
.content {
  height: 100vh;
  width: 100vw;
}
img {
  width: 50%;
  height: 30%;
  display: block;
  margin: auto;
}
.login-form {
  text-align: center;
  margin: 0 auto;
}
.syncLogin {
  width: 100%;
  position: absolute;
  bottom: 0px;
}
</style>
