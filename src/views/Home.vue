<template>
  <div>
    <naver-map></naver-map>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import NaverMap from "@/components/NaverMap";
export default {
  name: "Home.vue",
  components: {
    NavBar,
    NaverMap,
  },
};
</script>

<style scoped></style>
