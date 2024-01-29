import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { AllUsersContainer, Users } from "./AllUsers.styles";
import { User } from "../../models/User";
import { UserApi } from "../../api/UserApi";
import { toast } from "react-toastify";
import { SingleUser } from "../../components/SingleUser.tsx/SingleUser";
import { Haeding } from "../../router/App.styles";
import { CLOSE_TIME } from "../../constants/constants";

export const AllUsers = () => {
    const { currentUser } = useContext(UserContext);
    const [users, setUsers] = useState<User[]>([]);

    const getAllUsers = useCallback(async () => {
        try {
            if (currentUser?.role === "ADMIN") {
                const result = await UserApi.getAllUsers();
                setUsers(result.data);
            }
        } catch (error: any) {
            let message: string;

            if (error.response.status === 403) {
                message = "Your token expired, sign in again";
            } else {
                message = "something went wrong with the server!";
            }

            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: CLOSE_TIME,
            });
        }
    }, [currentUser?.role]);

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    return (
        <AllUsersContainer>
            <Haeding>All App Users</Haeding>
            <Users>
                {users.map((user, index) => (
                    <SingleUser key={index} user={user} />
                ))}
            </Users>
        </AllUsersContainer>
    );
};
