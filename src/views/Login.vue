<template>
  <div class="content">
    <van-form class="login-form">
      <van-nav-bar
        left-text="Home"
        left-arrow
        @click-left="$router.replace('/home')"
      />
      <img
        src="@/assets/splashScreen.png"
        style="width: 40%; height: 25%; display: block; margin: auto"
      />
      <van-cell-group inset class="login-info">
        <van-field
          v-model.trim="user.userid"
          clearable
          left-icon="manager"
          placeholder="Username"
        />
        <van-field
          v-model.trim="user.password"
          type="password"
          placeholder="password"
          left-icon="lock"
          right-icon="question-o"
          clearable
          @click-right-icon="$toast('비밀번호를 잊으셨나요?')"
        />
      </van-cell-group>
      <div style="margin: 15px">
        <van-button round type="info" size="large" @click="handleLogin">
          Login
        </van-button>
      </div>
    </van-form>
    <div style="text-align: center">
      <van-button
        text="New account"
        type="info"
        plain
        icon="plus"
        size="small"
        style="margin: 5px auto"
      />
      <van-button
        text="Forgot password"
        type="info"
        plain
        icon="lock"
        size="small"
        style="margin: 5px auto"
      />
    </div>
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
