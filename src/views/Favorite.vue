<template>
  <div>
    <van-nav-bar left-text="찜한 식당" fixed> </van-nav-bar>
    <div style="margin-top: 46px; margin-bottom: 50px">
      <van-card
          v-for="(item, index) in list"
          :key="index"
          :num="item.userid"
          :title="item.restnm"
          :desc="item.addr1"
          thumb="https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      >
        <template #tags>
          <van-tag plain type="danger">Tag</van-tag>
          <van-tag plain type="danger">Tag</van-tag>
        </template>
        <template #footer>
          <van-button size="mini">Button</van-button>
          <van-button size="mini">Button</van-button>
        </template>
      </van-card>
    </div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import { getFavoriteList } from "@/api/cafeteria";
import storage from "@/utils/storage";
import navBar from "@/components/NavBar";

export default {
  name: "Favorite.vue",
  components: {
    navBar,
  },
  //데이터용도로 사용할 변수 모음
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1,
      totalPage: 0,
    };
  },
  async mounted() {
    const data = await getFavoriteList(storage.get("UserInfo"));
    this.list = data.data;
  },
};
</script>

<style></style>
