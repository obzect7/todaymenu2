/**
 * 쿠키의 액세스 토큰/사용자 및 기타 관련 정보
 * @author leeminsu
 * @since 2022.05.08
 */
function setCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 30);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  var arr = document.cookie.match(reg);

  if (arr) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

function getToken() {
  return getCookie("Authorization");
}

export { setCookie, getCookie, getToken };
