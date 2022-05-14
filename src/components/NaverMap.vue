<template>
  <div>
    <naver-maps
      :height="height"
      :width="width"
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      @load="onLoad"
    >
      <naver-marker
        v-for="(item, index) in markerList"
        :key="index"
        :lat="item.latitude"
        :lng="item.longitude"
        @click="onMarkerClicked"
        @load="onMarkerLoaded"
      >
      </naver-marker>
      <naver-info-window
        class="info-window"
        @load="onWindowLoad"
        :isOpen="info"
        :marker="marker"
      >
        <div class="info-window-container">
          <h1>{{ hello }}</h1>
        </div>
      </naver-info-window>
    </naver-maps>
  </div>
</template>

<script>
import { getMarkerList } from "@/api/cafeteria";

export default {
  name: "HelloWorld",
  data() {
    return {
      width: 360,
      height: 600,
      info: false,
      marker: null,
      markerList: [],
      test1: 1,
      test2: 2,
      count: 1,
      map: null,
      isCTT: false,
      mapOptions: {
        lat: 35.2203899,
        lng: 128.6805195,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: { position: "TOP_RIGHT" },
        mapTypeControl: true,
      },
      initLayers: [
        "BACKGROUND",
        "BACKGROUND_DETAIL",
        "POI_KOREAN",
        "TRANSIT",
        "ENGLISH",
        "CHINESE",
        "JAPANESE",
      ],
    };
  },

  computed: {
    hello() {
      return `Hello, World! × ${this.count}`;
    },
  },
  methods: {
    onLoad(vue) {
      this.map = vue;
    },
    onWindowLoad() {},
    onMarkerClicked(event) {
      console.log("event===", event);
      this.info = !this.info;
    },
    onMarkerLoaded(vue) {
      this.marker = vue.marker;
    },
    getMyposition() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
  },
  async mounted() {
    const callback = await getMarkerList();
    console.log("callback===", callback);
    this.markerList = callback.data;
  },

  created() {
    navigator.geolocation.getCurrentPosition((position) => {
      // doSomething(position.coords.latitude, position.coords.longitude);
      console.log("내 위도 경도? === ", position.coords);
      this.test1 = position.coords.latitude;
      this.test2 = position.coords.longitude;
      console.log("test1 == ", this.test1);

      // this.$refs.naver.updateBy(position.coords, 16);
    });
  },
};
</script>
<style scoped>
.info-window-container {
  padding: 10px;
  width: 300px;
  height: 100px;
}
</style>
