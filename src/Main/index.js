import React, { createContext, useContext, useState } from "react";
import { Grid, Box } from "theme-ui";
import GridLayout from "react-grid-layout";
import dashboard from "./dashboard";
import { TimeContext } from "../Time";

const GridElement = ({topBar = true,...props}) => {
  return (
    <Box
      p={0}
      bg={"background"}
      sx={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      }}
      {...props}
    >
      <Box
        hidden={topBar === false}
        p={2}
        sx={{
          borderBottom: "1px solid #e5e5e5"
        }}
      >
        ...
      </Box>
      {props.children}
    </Box>
  );
};

const DashboardGrid = () => {
    // layout is an array of objects, see the demo for more complete usage

    return (
      <div style={{ position: "relative" }}>
        <GridLayout
          className="layout"
          layout={dashboard.layout}
          cols={12}
          rowHeight={30}
          width={1540}
        >
          {dashboard.layout.map(data => {
            return (
              <GridElement key={data.i} topBar={data.topBar} >
                <data.content height={data.h * 30} width={"200"} />
              </GridElement>
            );
          })}
        </GridLayout>
      </div>
    );
}

export const Main = () => {
  const [ timeCursor, setTimeCursor ] = useState(0);

  return (
    <Grid>
      <Box bg={"white"} p={10}>
        <TimeContext.Provider value={{
          timeCursor,
          setTimeCursor}}>
          <DashboardGrid />
        </TimeContext.Provider>
      </Box>
    </Grid>
  );
};
