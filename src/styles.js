import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "#c8c8c8",
};

export const darkTheme = {
  fontColor: "#c8c8c8",
  bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        background-color: ${(props) => props.theme.bgColor};
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
