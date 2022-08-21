export interface IUser {
    id: number | null;
    name: string | null;
    email: string | null;
}

export interface IMyUser extends IUser {
    role : string | null;
}

export interface IMyUserResponse extends IMyUser {
    accessToken: string;
    password: string;
    my: IMyUser;
}