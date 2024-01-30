import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LinkGroup, LogoutLinkButton, NavbarContainer, NavbarLink, NavbarLinks } from "./Navbar.styles";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { ACCESS_TOKEN, CLOSE_TIME } from "../../constants/constants";
import { handleLogout } from "../../auth_helpers/authHelpers";
import { toast } from "react-toastify";

export const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser, userModifier } = useContext(UserContext);
    const location = useLocation();

    const handleOnLogoutClick = async () => {
        const jwtToken: string | null = localStorage.getItem(ACCESS_TOKEN);
        try {
            if (jwtToken) {
                await handleLogout(jwtToken);
                userModifier(null);
                navigate("/");
            }
            toast.success("You have successfully logged out", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: CLOSE_TIME,
            });
        } catch (error) {
            toast.error("Unsuccessful logout!!!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: CLOSE_TIME,
            });
        }
    };

    return (
        <>
            <NavbarContainer>
                <NavbarLinks>
                    <LinkGroup>
                        {currentUser && (
                            <NavbarLink
                                style={{
                                    textDecoration: location.pathname === "/my_items_for_sale" ? "underline" : "none",
                                }}
                                to={"/my_items_for_sale"}
                            >
                                My Items For Sale
                            </NavbarLink>
                        )}

                        {currentUser && (
                            <NavbarLink
                                style={{
                                    textDecoration: location.pathname === "/my_purchased_items" ? "underline" : "none",
                                }}
                                to={"/my_purchased_items"}
                            >
                                My Purchased Items
                            </NavbarLink>
                        )}
                    </LinkGroup>
                    <LinkGroup>
                        <NavbarLink
                            style={{ textDecoration: location.pathname === "/" ? "underline" : "none" }}
                            to={"/"}
                        >
                            All Items
                        </NavbarLink>

                        {currentUser && (
                            <NavbarLink
                                style={{ textDecoration: location.pathname === "/add_item" ? "underline" : "none" }}
                                to={"/add_item"}
                            >
                                Add Item
                            </NavbarLink>
                        )}

                        {currentUser?.role === "ADMIN" && (
                            <NavbarLink
                                style={{ textDecoration: location.pathname === "/users" ? "underline" : "none" }}
                                to={"/users"}
                            >
                                Users
                            </NavbarLink>
                        )}
                    </LinkGroup>
                    <LinkGroup>
                        <NavbarLink
                            style={{ textDecoration: location.pathname === "/register" ? "underline" : "none" }}
                            to={"/register"}
                        >
                            Register
                        </NavbarLink>

                        {!currentUser && (
                            <NavbarLink
                                style={{ textDecoration: location.pathname === "/login" ? "underline" : "none" }}
                                to={"/login"}
                            >
                                Login
                            </NavbarLink>
                        )}

                        {currentUser && <LogoutLinkButton onClick={handleOnLogoutClick}>Logout</LogoutLinkButton>}
                    </LinkGroup>
                </NavbarLinks>
            </NavbarContainer>
            <Outlet />
        </>
    );
};
