import axiosInstance from "./_axiosInstance";
import { TripsPendingTypes, TripDetailsTypes } from "../types/trips";

export async function apiTripDetailsGetById(id: string | number) {
  return axiosInstance.get<TripDetailsTypes>(`/trips/${id}`);
}

// for rider API
export async function apiTripsPendingGet() {
  return axiosInstance.get<TripsPendingTypes>("/trips/pending");
}
