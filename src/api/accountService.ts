import axiosInstance from "./_axiosInstance";
import { LoginTypes, LoginReponseTypes } from "../types/account";

export async function apiVerifyUserLogin<T>() {
  return axiosInstance.post<T>("/Account/login/verify");
}

export async function apiLoginOTP<T>() {
  return axiosInstance.post<T>("/Account/login/otp");
}

export async function apiCreateUser<T>() {
  return axiosInstance.post<T>("/Account/user/create");
}

export async function apiNewPhoneNumber<T>() {
  return axiosInstance.post<T>("/Account/new-phone/otp");
}

export async function apiTestLoginOTP(data: LoginTypes) {
  return axiosInstance.post<LoginReponseTypes>("/TestAccountNoOpt/login", data);
}


