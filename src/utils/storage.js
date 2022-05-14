/**
 * 토큰/사용자와 같은 관련 정보에 대한 로컬 액세스
 * @author leeminsu
 * @since 2022.05.08
 */
const storage = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  },
  del(key) {
    localStorage.removeItem(key);
  },
};

export default storage;
