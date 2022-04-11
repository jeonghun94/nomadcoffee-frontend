import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#00acee",
  fontColor: "#2c2c2c",
  bgColor: "#fafafa",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
  accent: "#00acee",
  fontColor: "#c8c8c8",
  bgColor: "#2c2c2c",
  borderColor: "rgb(219, 219, 219)",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
      outline: none;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        width: 100%;
        height: 100vh;
        
    } 
    a {
      text-decoration: none;
    }
  
`;
