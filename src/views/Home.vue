<template>
  <div>
    <van-nav-bar left-text="홈" />
    <kakao-map></kakao-map>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import kakaoMap from "@/components/KakaoMap.vue";
export default {
  components: {
    NavBar,
    kakaoMap,
  },
};
</script>

<style scoped></style>
