export function isvalidUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

/* uri 유효성검사 */
export function validateURL(textval) {
  const urlregex =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 소문자 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 대문자 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 대문자와 소문자 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

// 파일 내보내기 또는 다운로드
export function downloadFile(url) {
  if (!url) {
    console.warn("downloadFile url missing");
    return false;
  }
  var $a = document.createElement("a");
  $a.setAttribute("href", url);
  $a.setAttribute("download", "");
  $a.setAttribute("mce_href", "#");
  var evObj = document.createEvent("MouseEvents");
  evObj.initMouseEvent(
    "click",
    true,
    true,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  $a.dispatchEvent(evObj);
}

// 전환 시 프롬프트 지우기
export const clearError = function (fields) {
  fields.map((item) => {
    item.validateState = "";
    item.validateMessage = "";
  });
};
