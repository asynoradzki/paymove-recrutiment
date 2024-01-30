import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR1, COLOR2, COLOR5, MIN_WIDTH, NAVBAR_HEIGHT } from "../../constants/constants";

export const NavbarContainer = styled.div`
    height: ${NAVBAR_HEIGHT};
    background-color: ${COLOR1};
    min-width: ${MIN_WIDTH};
`;

export const NavbarLinks = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
`;

export const NavbarLink = styled(Link)`
    text-decoration: none;
    color: ${COLOR5};
    font-size: 24px;

    &:hover {
        cursor: pointer;
        color: ${COLOR2};
    }
`;

export const LogoutLinkButton = styled.span`
    text-decoration: none;
    color: ${COLOR5};
    font-size: 24px;

    &:hover {
        cursor: pointer;
        color: ${COLOR2};
    }
`;

export const LinkGroup = styled.div`
    display: flex;
    gap: 24px;
    justify-content: center;
`;
