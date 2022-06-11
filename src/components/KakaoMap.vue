<template>
  <div>
    <div id="map" :style="{width: device.widht, height: device.height}"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      device: {
        widht: screen.width + "px",
        height: (screen.height -96) + "px",
      },
      map: "",
    };
  },
  mounted() {
    const script = document.createElement("script");
    script.onload = () => window.kakao.maps.load(this.initMap);
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
    document.head.appendChild(script);
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 4,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new window.kakao.maps.Map(container, options);

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      this.map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->