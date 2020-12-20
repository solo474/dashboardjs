import { Main } from "../../Main";
import React from 'react';
import { Topbar } from '../../Topbar';
import { Box, Grid } from 'theme-ui';
import { SideBar } from '../../Sidebar';
import Home from '../Home';

export default ({theme,setTheme,id}) =><> <Topbar
  onThemeChange={()=>{
    theme === 'light'
      ? setTheme('dark')
      : setTheme('light');
  }}
/>
  <Grid columns={["1fr"]} gap={0}>

    <Main id={id}/>
  </Grid></>;
