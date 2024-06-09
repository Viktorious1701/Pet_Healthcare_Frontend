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