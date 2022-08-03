// 封装localstorage存取token

const TOKEN_KEY = "react-learning-key";

const setToken = (token: string) => {
  return window.localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
  return window.localStorage.removeItem(TOKEN_KEY);
};

export { setToken, getToken, removeToken };
