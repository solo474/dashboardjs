import React, { useState } from "react";
import "./styles.css";
import { SideBar } from "./Sidebar";
import { Main } from "./Main";
import { Grid,Box } from "theme-ui";

import { Helmet } from "react-helmet";

import { ThemeProvider } from "emotion-theming";
import light from "./Theme";
import dark from "./Theme/dark";
import { Topbar } from './Topbar';

export default function App() {
  const [theme,setTheme] = useState('dark');
  return (
    <ThemeProvider theme={theme === 'light' ? light : dark }>
      <Box bg={'background'} className="App">
        <Helmet>
          <title>Web page Performance Analytics</title>
          <style>
            {`html,body {
            margin: 0;
            body: 0;
          }`}
          </style>
        </Helmet>
       <Topbar
         onThemeChange={()=>{
           theme === 'light'
             ? setTheme('dark')
             : setTheme('light');
         }}
       />
        <Grid columns={["40px 1fr"]} gap={0}>
          <SideBar
            onThemeChange={()=>{
              theme === 'light'
                ? setTheme('dark')
                : setTheme('light');
            }}
          />
          <Main />
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
