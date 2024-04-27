import instance from "../axios";

export async function fetchSellerProfile(username) {
  try {
    const response = await instance.get(`/main/sellerProfile/${username}`);

    return Promise.resolve(response.data?.data);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
}
