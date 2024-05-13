import instance from "../axios";

export async function GetCities(city) {
  try {
    const res = await instance.get(`/suggestion/cities?keyword=${city}`);
    return Promise.resolve(res.data?.cities);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
}

export async function GetProfessions(profession = "") {
  try {
    const res = await instance.get(
      `/suggestion/professions?keyword=${profession}`
    );
    return Promise.resolve(res.data?.professions);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
}

export async function GetCollegs(college = "") {
  try {
    const res = await instance.get(`/suggestion/colleges?keyword=${college}`);
    return Promise.resolve(res.data?.colleges);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
}

export async function GetServices(service = "") {
  try {
    const res = await instance.get(`/suggestion/services?keyword=${service}`);
    return Promise.resolve(res.data?.services);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
}

export async function GetSkills(skill = "") {
  try {
    const res = await instance.get(`/suggestion/skills?keyword=${skill}`);
    return Promise.resolve(res.data?.skills);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
}
