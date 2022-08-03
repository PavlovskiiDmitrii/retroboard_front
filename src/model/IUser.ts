import { StringLiteral } from "typescript";

export interface IUser {
    id: number;
    name: string;
    email: string;
}

export interface IMyUser extends IUser {
    role : string;
}

export interface IMyUserResponse extends IMyUser {
    accessToken: string;
}