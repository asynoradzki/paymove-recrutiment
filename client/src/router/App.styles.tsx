import styled from "styled-components";
import { COLOR3, COLOR5, CONTENT_HEIGHT, MIN_WIDTH } from "../constants/constants";

export const AppContainer = styled.div`
    min-height: 100%;
`;

export const GeneralContainer = styled.div`
    min-height: ${CONTENT_HEIGHT};
    background-color: ${COLOR5};
    min-width: ${MIN_WIDTH};
`;

export const Haeding = styled.div`
    background-color: ${COLOR3};
    width: 100%;
    padding: 16px 0;
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    font-style: italic;
    margin-bottom: 24px;
`;
