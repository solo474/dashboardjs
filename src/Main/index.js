import React from "react";
import { Grid, Box } from "theme-ui";
import GridLayout from "react-grid-layout";
import dashboard from "./dashboard";

const GridElement = props => {
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

class DashboardGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage

    return (
      <div style={{ position: "relative" }}>
        <GridLayout
          className="layout"
          layout={dashboard.layout}
          cols={12}
          rowHeight={30}
          width={1200}
        >
          {dashboard.layout.map(data => {
            return (
              <GridElement key={data.i}>
                <data.content height={data.h * 30} width={"200"} />
              </GridElement>
            );
          })}
        </GridLayout>
      </div>
    );
  }
}

export const Main = () => {
  return (
    <Grid>
      <Box bg={"white"} p={10}>
        <DashboardGrid />
      </Box>
    </Grid>
  );
};
