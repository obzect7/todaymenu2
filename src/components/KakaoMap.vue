<template>
  <div>
    <div id="map" :style="{ width: device.widht, height: device.height }"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      device: {
        widht: screen.width + "px",
        height: screen.height - 96 + "px",
      },
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
      //01. 카카오 지도 생성
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 8,
      };
      const map = new window.kakao.maps.Map(container, options);

      //02. 카카오 (지도/스카이뷰) 버튼 생성
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(
        mapTypeControl,
        window.kakao.maps.ControlPosition.TOPRIGHT
      );

      //03. 내위치 받아오기
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const moveLatLon = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(moveLatLon);
          },
          function (error) {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        console.log("GPS를 지원하지 않습니다");
      }
    },
  },
};
</script>
