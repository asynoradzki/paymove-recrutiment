import { authorizedApi } from "../hooks/withAxiosIntercepted";
import { User } from "../models/User";

export class UserApi {
    static getAllUsers = async () => await authorizedApi.get<User[]>(`/users/`);
}
