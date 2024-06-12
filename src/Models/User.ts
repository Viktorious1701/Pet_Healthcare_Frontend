export type UserProfileToken = {
    userName: string;
    email: string;
    token: string;
};

export type UserProfile = {
    userName: string;
    email: string;
    role: string;
};

export type UserGet = {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    imageURL: string
};
export type UserInfo = {
    address: string,
    country: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    gender: string,
    userName: string,
}