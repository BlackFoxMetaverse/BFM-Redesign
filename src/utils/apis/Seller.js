import instance from "../axios";

export async function CreateSeller(sellerInputData, token) {
  try {
    const response = await instance.post("/main/seller", sellerInputData, {
      headers: {
        token: token,
      },
    });

    return Promise.resolve(response.data?.data);
  } catch (error) {
    return Promise.reject(error?.response?.data?.error);
  }
}

export async function EditSeller(sellerInputData, token) {
  try {
    const response = await instance.put("/main/seller", sellerInputData, {
      headers: {
        token: token,
      },
    });

    return Promise.resolve(response.data?.data);
  } catch (error) {
    return Promise.reject(error?.response?.data?.error);
  }
}
