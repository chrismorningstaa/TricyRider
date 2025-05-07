export type DriversType = {
  id?: number | null;
  name?: string | null;
  rating?: number | null;
  tricycleNumber?: string | null;
  isActive?: boolean | null;
};

export type DriversProfile = {
  id: number | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  emailAddress: string | null;
  rating: number | null;
  totalRides: number | null;
  memberSince: string | null;
  tricycleInfo: {
    id: number | null;
    driverId: number | null;
    plateNumber: string | null;
    model: string | null;
    color: string | null;
  };
};
