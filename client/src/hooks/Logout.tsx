import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    const { userModifier } = useContext(UserContext);
    console.log("akuku");

    useEffect(() => {
        userModifier(null);
        navigate("/login");
    }, [userModifier, navigate]);

    return <></>;
};
