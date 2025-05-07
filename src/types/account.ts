export type LoginTypes = {
  phonenumber?: string | null;
};

export type LoginReponseTypes = {
  token: string;
  user: {
    id: number | null,
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    age: number | null,
    roleId: number | null,
    genderId: number | null,
    emailAddress: string | null;
    phoneNumber: string | null;
    isVerifiedNumber: boolean | null,
    isVerifiedEmail: boolean | null,
    driverId: number | null,
    createdDate: Date | null
  }
};
