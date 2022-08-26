import { IUser } from './IUser'

export interface IGroup {
    id: number,
    title: string;
    owner_id: number;
    clients: IUser[]
}
