<template>
  <div id="app">
    <SomeComponent></SomeComponent>
    <router-view />
  </div>
</template>

<script>
export default {
  /*  Script import
   *  Script는 App.vue에서 추가해주고 사용하는 vue에서 체킹하를 로직을 넣어 총 2번 체킹함
   */
  components: {
    SomeComponent: () => {
      return new Promise(() => {
        let scripts = [
          "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js",
          "https://apis.google.com/js/client.js?onload=load",
          "https://apis.google.com/js/platform.js",
          "https://developers.kakao.com/sdk/js/kakao.min.js",
        ];
        for (let i = 0, len = scripts.length; i < len; i++) {
          let script = document.createElement("script");
          script.setAttribute("src", scripts[i]);
          script.async = true;
          script.defer = true;
          document.getElementsByTagName("head")[0].appendChild(script);
        }
      });
    },
  },
};
</script>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
