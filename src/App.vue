<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    addScript: function () {
      let scripts = [
        "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js",
        "https://developers.kakao.com/sdk/js/kakao.min.js",
      ];
      for (let i = 0, len = scripts.length; i < len; i++) {
        let script = document.createElement("script");
        script.setAttribute("src", scripts[i]);
        script.setAttribute("type", "text/javascript");
        script.setAttribute("charset", "utf-8");
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    },
  },
  mounted() {
    this.addScript();
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
