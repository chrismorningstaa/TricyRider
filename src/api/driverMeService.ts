import { DriversProfile } from "../types/drivers";
import axiosInstance from "./_axiosInstance";

export async function apiDriverAcceptBooking<T>() {
  return axiosInstance.post<T>("/driver/me/accept-book");
}

export async function apiDriverProfile() {
  return axiosInstance.get<DriversProfile>("/driver/me/profile");
}