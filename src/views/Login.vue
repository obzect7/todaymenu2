<template>
  <div class="login">
    <form @submit.prevent="handleLogin">
      <img class="login-poster" src="../assets/img.png" />

      <van-cell-group class="login-info">
        <van-field
          v-model.trim="user.userid"
          required
          clearable
          label="사용자ID"
          placeholder="사용자ID를 입력하세요."
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
      <van-button type="primary" size="large"> 로그인 </van-button>
    </form>
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
    storage.set("UserInfo", "");

    // if (storage.get("UserInfo")) {
    //   this.user = storage.get("UserInfo");
    // }
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
  },
};
</script>

<style scoped>
.login {
  background-color: #fff;
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }
  &-info {
    margin-top: 15vw;
  }
  &-btn {
    margin-top: 10vw;
    width: 90%;
    margin-left: 5%;
  }
  .van-button--primary {
    color: #fff;
    background-color: #ff595f;
    border-color: #ff595f;
  }
  .van-button--large {
    width: 90%;
    margin-top: 10vw;
    margin-left: 5%;
    height: 5%;
    line-height: 245%;
  }
}
</style>
