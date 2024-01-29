export type RegisterRequest = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER" | null;
};
