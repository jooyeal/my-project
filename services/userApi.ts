import axios, { AxiosError } from "axios";

export const createUser = async (userInfo: User) => {
  try {
    const res = await axios.post(`api/signup`, userInfo);
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
  }
};

export const loginUser = async (loginInfo: LoginInfo) => {
  try {
    const res = await axios.post("api/login", loginInfo);
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
  }
};
