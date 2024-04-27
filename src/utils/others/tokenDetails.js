const TokenDetails = {
  getToken: () => {
    return localStorage.getItem("bfm-auth-token");
  },
  setToken: (token) => {
    return localStorage.setItem("bfm-auth-token", token);
  },
  removeToken: () => {
    return localStorage.removeItem("bfm-auth-token");
  },
  hasToken: () => {
    if (TokenDetails.getToken()) {
      return true;
    } else {
      return false;
    }
  },
};

export default TokenDetails;
