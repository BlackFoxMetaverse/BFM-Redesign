import instance from "../axios";

export async function CreateSeller(formData, token) {
  try {
    const response = await instance.post("/main/seller", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: token,
      },
    });

    return Promise.resolve(response.data?.data);
  } catch (error) {
    return Promise.reject(error?.response?.data?.error);
  }
}

export async function EditSeller(formData, token) {
  try {
    const response = await instance.put("/main/seller", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: token,
      },
    });

    return Promise.resolve(response.data?.data);
  } catch (error) {
    return Promise.reject(error?.response?.data?.error);
  }
}
