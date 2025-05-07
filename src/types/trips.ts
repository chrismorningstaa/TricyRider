export type TripDetailsTypes = {
  driver?: {
    id?: number | null;
    name?: string | null;
    isActive?: boolean | null;
  };

  booker?: {
    id?: number | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    age?: number | null;
    roleId?: number | null;
    genderId?: number | null;
    emailAddress?: string | null;
    phoneNumber?: string | null;
    isVerifiedNumber?: boolean | null;
    isVerifiedEmail?: boolean | null;
    driverId?: number | null;
    createdDate?: string | null;
  };

  payment?: {
    id?: number | null;
    payerId?: number | null;
    tripId?: number | null;
    method?: string | null;
    baseFare?: number | null;
    tip?: number | null;
    total?: number | null;
  };

  id: number | null;
  bookBy: number | null;
  driverId: null;
  date: string | null;
  time: string | null;
  pickup: string | null;
  dropoff: string | null;
  fare: number | null;
  status: string | null;
  duration: string | null;
  distance: number | null;
};

export type TripsPendingTypes = {
  id: number | null;
  bookBy: number | null;
  driverId: number | null;
  date: string | null;
  time: string | null;
  pickup: string | null;
  dropoff: string | null;
  fare: number | null;
  status: string | null;
  duration: string | null;
  distance: string | null;
};
