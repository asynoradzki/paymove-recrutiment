import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../constants/constants";
import { AuthApi } from "../api/AuthApi";

export function saveTokenToLocaleStorage({ access_token }: { access_token: string }): void {
    localStorage.setItem(ACCESS_TOKEN, access_token);
}

export const validateEmailRFC2822 = (email: string): boolean => {
    const validRegex: RegExp =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return validRegex.test(email);
};

export const getJwtToken = async (): Promise<string | null> => {
    const jwtToken: string | null = localStorage.getItem(ACCESS_TOKEN);

    if (verifyIfTokenIsValid(jwtToken)) {
        return jwtToken;
    }

    if (jwtToken) {
        handleLogout(jwtToken);
    }

    return null;
};

function verifyIfTokenIsValid(jwtToken: string | null): boolean {
    const currentTimestamp = Math.round(Date.now() / 1000);
    if (jwtToken === null || jwtToken.length === 0) {
        return false;
    }
    const decodedToken = jwtDecode(jwtToken) as any;
    const tokenExp = decodedToken.exp as number;

    return !isTokenExpired(tokenExp, currentTimestamp);
}

function isTokenExpired(tokenExp: number, currentTimestamp: number): boolean {
    const tenSeconds: number = 10;
    return tokenExp < currentTimestamp - tenSeconds;
}

export const handleLogout = async (jwtToken: string) => {
    try {
        await AuthApi.logout(jwtToken);
    } catch (error: any) {
        console.log("An error on the server occurred while logging out");
    }

    localStorage.clear();
};
