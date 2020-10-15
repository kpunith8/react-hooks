import cookie from "cookie";

export const getCookie = (key) => {
  const cookies = cookie.parse(document.cookie);

  return cookies[String(key)];
};
