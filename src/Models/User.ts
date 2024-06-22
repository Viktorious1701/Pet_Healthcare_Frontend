export type UserProfileToken = {
    role: any;
    userName: string;
    email: string;
    token: string;
    refreshToken: string;
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
    userId: string,
    role: string,
    address: string,
    country: string,
    email: string,
    rating: number,
    yearsOfExperience: number,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    gender: boolean,
    userName: string,
    isActive: boolean,
    imageUrl: string,
    imageFile: File
}