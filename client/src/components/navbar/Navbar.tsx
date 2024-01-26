import { Outlet } from "react-router-dom";
import { LogoutLinkButton, NavbarContainer, NavbarLink, NavbarLinks } from "./Navbar.styles";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { ACCESS_TOKEN } from "../../constants/constants";
import { handleLogout } from "../../auth_helpers/authHelpers";

export const Navbar = () => {
    const { currentUser, userModifier } = useContext(UserContext);

    const handleOnLogoutClick = async () => {
        const jwtToken: string | null = localStorage.getItem(ACCESS_TOKEN);
        if (jwtToken) {
            await handleLogout(jwtToken);
            userModifier(null);
        }
    };

    return (
        <>
            <NavbarContainer>
                <NavbarLinks>
                    {!currentUser && <NavbarLink to={"/login"}>Login</NavbarLink>}
                    {currentUser && <LogoutLinkButton onClick={handleOnLogoutClick}>Logout</LogoutLinkButton>}
                    <NavbarLink to={"/"}>All Items</NavbarLink>
                </NavbarLinks>
            </NavbarContainer>
            <Outlet />
        </>
    );
};
