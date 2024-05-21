import instance from "../axios";

export async function checkExistingUser(token = "") {
  try {
    const response = await instance.get(`/main/login`, {
      headers: {
        token: token,
      },
    });

    return Promise.resolve(response.data?.check);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
}

export async function checkUserDataByToken(token) {
  try {
    const response = await instance.get("check/token", {
      headers: {
        token: token,
      },
    });

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function checkUserName(value = "") {
  try {
    if (value === "") return Promise.resolve(true);
    const uid = sessionStorage.getItem("bfm-seller-uid");
    const response = await instance.get(
      `/check/userName?uid=${uid}&userName=${value}`
    );
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
}
export async function checkPhoneNumber(value = "") {
  try {
    if (value === "") return Promise.resolve(true);
    const uid = sessionStorage.getItem("bfm-seller-uid");
    const response = await instance.get(
      `/check/phone?uid=${uid}&phone_number=${encodeURIComponent(
        "+91" + value
      )}`
    );
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
}
