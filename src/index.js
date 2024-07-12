import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
a{
  text-decoration: none;
  color: inherit;
}
*{
  box-sizing: border-box;
}
html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
a, dl, dt, dd, ol, ul, li, form, label, table{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 10px;
  vertical-align: baseline;
}
ol, ul{
  list-style: none;
}
button {
  border: 0;
  background: transparent;
  cursor: pointer;
}
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
