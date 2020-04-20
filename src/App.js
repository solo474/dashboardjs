import React from "react";
import "./styles.css";
import { SideBar } from "./Sidebar";
import { Main } from "./Main";
import { Grid } from "theme-ui";

import { Helmet } from "react-helmet";

import { ThemeProvider } from "emotion-theming";
import theme from "./Theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Helmet>
          <title>Hello</title>
          <style>
            {`html,body {
            margin: 0;
            body: 0;
          }`}
          </style>
        </Helmet>
        <Grid columns={["40px 100%"]} gap={0}>
          <SideBar />
          <Main />
        </Grid>
      </div>
    </ThemeProvider>
  );
}
