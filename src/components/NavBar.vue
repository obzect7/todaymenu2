<template>
  <van-tabbar v-model="active">
    <van-tabbar-item name="home" icon="wap-home" replace to="/home"
      >홈</van-tabbar-item
    >
    <van-tabbar-item name="like" icon="like-o" replace to="/favorite"
      >찜한식당</van-tabbar-item
    >
    <van-tabbar-item name="comment" icon="comment-o" replace to="/favorite"
      >출입내역</van-tabbar-item
    >
    <van-tabbar-item name="friends" icon="friends-o" replace to="/myPage"
      >My오메</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      active: false,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
