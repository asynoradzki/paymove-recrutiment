import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios, { AxiosRequestConfig } from "axios";
import { getJwtToken } from "../auth_helpers/authHelpers";

export const authorizedApi = axios.create();

export function withAxiosIntercepted<T extends JSX.IntrinsicAttributes>(Component: React.ComponentType<T>) {
    return function AxiosIntercepted(props: T) {
        const navigate = useNavigate();
        const [isInitialized, setIsInitialized] = useState<boolean>(false);
        const { userModifier, currentUser } = useContext(UserContext);

        useEffect(() => {
            axios.interceptors.request.use((config: AxiosRequestConfig) => {
                return {
                    ...config,
                    baseURL: process.env.REACT_APP_API_URL,
                };
            });

            authorizedApi.interceptors.request.use(async (config: AxiosRequestConfig) => {
                const token: string | null = await getJwtToken();

                if (token) {
                    if (config?.headers) {
                        config.headers["Authorization"] = `Bearer ${token}`;
                        config.headers["accept"] = "*/*";
                    }
                } else {
                    userModifier(null);
                    navigate("/logout");
                }
                return {
                    ...config,
                    baseURL: process.env.REACT_APP_API_URL,
                };
            });

            authorizedApi.interceptors.response.use(
                (response: any) => {
                    return response; //.data
                },
                (error: any) => {
                    if (error.response.status === 403) {
                        localStorage.clear();
                        console.log("current user interceptor: ", currentUser);
                    }
                    return Promise.reject(error);
                }
            );

            setIsInitialized(true);
        }, [navigate, userModifier, currentUser]);

        return isInitialized ? <Component {...props} /> : <></>;
    };
}
