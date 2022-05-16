<template>
  <van-tabbar v-model="active" route="" true>
    <van-tabbar-item name="home" icon="home-o" replace to="/home"
      >홈</van-tabbar-item
    >
    <van-tabbar-item name="favorite" icon="like-o" replace to="/favorite"
      >찜한식당</van-tabbar-item
    >
    <van-tabbar-item name="comment" icon="comment-o" replace to="/history"
      >출입내역</van-tabbar-item
    >
    <van-tabbar-item name="myPage" icon="friends-o" replace to="/myPage"
      >My오메</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      active: "",
    };
  },
  methods: {},
};
</script>

<style scoped></style>
