<template>
  <div class="content">
    <van-form class="login-form">
      <img
        src="@/assets/splashScreen.png"
        style="width: 50%; height: 30%; display: block; margin: auto"
      />
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
    <social-login></social-login>
  </div>
</template>

<script>
import storage from "@/utils/storage";
import SocialLogin from "@/views/SocialLogin";

export default {
  name: "login.vue",
  data() {
    return {
      user: { userid: "", password: "" },
    };
  },
  components: {
    SocialLogin,
  },
  mounted() {
    if (storage.get("UserInfo")) {
      this.user = storage.get("UserInfo");
    }
  },
  methods: {
    //LOGIN
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
          this.$router.replace({ path: "/home" });
        })
        .catch((error) => {
          // 오류 메시지, 구성 요소 프롬프트
          this.$toast({ message: error, duration: 1000 });
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
.login-form {
  text-align: center;
  margin: 0 auto;
}
</style>
