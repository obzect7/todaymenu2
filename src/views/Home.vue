<template>
  <div>
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
