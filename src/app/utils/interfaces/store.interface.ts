import { IAddress } from "./address.interface";

export interface IStore {
    username: string;
    password: string;
    confirmPassword?: string;
    realName: string;
    fantasyName: string;
    cnpj: string;
    email?: string;
    phone: string;
    address: IAddress;
}