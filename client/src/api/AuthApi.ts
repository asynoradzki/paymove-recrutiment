import axios from "axios";
import { SignInRequest } from "../models/SignInRequest";
import { SignInResponse } from "../models/SignInResponse";
import { RegisterRequest } from "../models/RegisterRequest";

export class AuthApi {
    static signIn = async (request: SignInRequest) =>
        await axios.post<SignInResponse>(`/api/v1/auth/authenticate`, request);

    static signUp = async (request: RegisterRequest) =>
        await axios.post<SignInResponse>(`/api/v1/auth/register`, request);

    static logout = async (jwtToken: string) =>
        await axios.post<void>("/api/v1/auth/logout", null, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
}
