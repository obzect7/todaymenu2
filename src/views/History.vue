<template>
  <div>
    <van-nav-bar left-text="출입 내역" />
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: "History",
  components: {
    NavBar,
  },
};
</script>

<style scoped></style>
