<template>
  <div>
    <van-nav-bar left-text="홈" />
    <naver-map></naver-map>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import naverMap from "@/components/NaverMap";
export default {
  components: {
    NavBar,
    naverMap,
  },
};
</script>

<style scoped></style>
