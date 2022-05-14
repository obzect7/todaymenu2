<template>
  <div>
    <naver-maps
      :height="height"
      :width="width"
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      @load="onLoad"
    >
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
      <naver-marker
        v-for="(item, index) in markerList"
        :key="index"
        :lat="item.latitude"
        :lng="item.longitude"
        @click="onMarkerClicked"
        @load="onMarkerLoaded"
      >
      </naver-marker>
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
      height: 800,
      info: false,
      marker: null,
      markerList: [],
      count: 1,
      map: null,
      isCTT: false,
      mapOptions: {
        lat: 37,
        lng: 127,
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
    onWindowLoad(that) {},
    onMarkerClicked(event) {
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
    // get position
    // navigator.geolocation.getCurrentPosition(pos => {
    //   console.log('pos === ',pos);
    //   this.mapOptions.lat = pos.coords.latitude;
    //   this.mapOptions.lng = pos.coords.longitude;
    // }, err => {
    //    // this.textContent = err.message;
    //   console.log('error == ',err)
    // })
    const getPosition = this.getMyposition();
    console.log("getPosition == ", getPosition);
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
