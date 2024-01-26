import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavbarContainer = styled.div`
    height: 15vh;
    background-color: black;
`;

export const NavbarLinks = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

export const NavbarLink = styled(Link)`
    text-decoration: none;
    color: #ffffff;
    font-size: 18px;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const LogoutLinkButton = styled.span`
    text-decoration: none;
    color: #ffffff;
    font-size: 18px;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;
