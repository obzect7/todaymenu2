<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    addScript: function () {
      //scripts 추가구문
      let scripts = [
        "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js",
        "https://developers.kakao.com/sdk/js/kakao.min.js",
        "https://apis.google.com/js/platform.js",
      ];
      for (let i = 0, len = scripts.length; i < len; i++) {
        let script = document.createElement("script");
        script.setAttribute("src", scripts[i]);
        script.async = true;
        script.defer = true;
        document.getElementsByTagName("head")[0].appendChild(script);
      }

      //meta 추가 구문
      let meta = document.createElement("meta");
      meta.name = "google-signin-client_id";
      meta.content =
        "418417431995-j034idlo8a80g23dgtekii0lujm58blm.apps.googleusercontent.com";
      document.getElementsByTagName("head")[0].appendChild(meta);
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
