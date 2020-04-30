import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap');

  /* left for debugging purposes */
  /* * { outline: solid 0.5px hsla(210, 100%, 100%, 0.5); } */

  body {
    color: #FFFFFF;
    background: #171717 0% 0% no-repeat;
    font-family: Poppins;
    font-size: 16px;
  }
`;

export default GlobalStyle;
