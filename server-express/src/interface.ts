import {Request} from "express";
import {IJwt} from "./users/users.interface";

export interface IMessage {
    message: string;
    result?: any
}

export interface IAuthRequest extends Request {
    user: IJwt // or any other type
}