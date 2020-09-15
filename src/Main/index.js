import React, { createContext, useContext, useState, useEffect } from "react";
import { Grid, Box } from "theme-ui";
import RGL, { WidthProvider} from "react-grid-layout";
import { FaCog } from 'react-icons/fa';

import { createDashboard } from "./dashboard";
import { TimeContext } from "../Time";

import { SingleStat } from '../Panels/SingleStat';
import { TimeSeries } from '../Panels/TimeSeries';
import { AuditAnalyzer } from '../Panels/AuditAnalyzer';
import { TimeRange } from '../Panels/TimeRange';
import { Filter } from '../Panels/Filter';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

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
        data-drag={'data-drag'}
        hidden={topBar === false}
        p={2}
        sx={{
          borderBottom: "1px solid #e5e5e5"
        }}
      >
        <Grid 
          columns="1fr 100px"
        >
          <Box></Box>
          <Box sx={{ textAlign: 'right' }} >
            <FaCog style={{ textAlign: 'right', cursor: 'pointer' }} />
          </Box>
        </Grid>
      </Box>
      {props.children}
    </Box>
  );
};

const Panels = {
  TimeRange,
  Filter,
  TimeSeries,
  AuditAnalyzer,
};

const panelIds = {
  '1': {
    w: 12,
    h: 7,
    panel: 'TimeRange'
  },
  '2': {
    w: 12,
    h: 7,
    panel: 'Filter'
  },
  '3': {
    w: 12,
    h: 7,
    panel: 'TimeSeries'
  },
  '4': {
    w: 12,
    h: 7,
    panel: 'TimeSeries'
  },
  '5': {
    w: 12,
    h: 7,
    panel: 'AuditAnalyzer'
  }
};


const DashboardGrid = () => {
    // layout is an array of objects, see the demo for more complete usage
    const [dashboard,setDashboard] = useState(createDashboard());

    useEffect(()=>{
      window.localStorage.setItem('dashboard',
        JSON.stringify(dashboard));
    },[dashboard]);

    const layout = dashboard.layout.map((data) => {
      console.log('content',data)
      const content = data.content || {
        w: 1,
        h: 1,
        panel: null
      };
      const Panel = content.panel ? 
      Panels[content.panel]
      : () => null;

      return {
        ...data,
        content: <Panel {...content} {...data} />
      }
    });

    return (
      <div style={{ position: "relative" }}>
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          draggableHandle={'[data-drag]'}
          onLayoutChange={(layout) => {
            setDashboard({layout: layout.map((data) => {
              return {
                ...data,
                content: panelIds[data.i]
              };
            }) });
          }}
        >
          {layout.map(data => {
            return (
              <GridElement key={data.i} topBar={data.topBar} >
                {data.content}
              </GridElement>
            );
          })}
        </ReactGridLayout>
      </div>
    );
}

export const Main = () => {
  const [ timeCursor, setTimeCursor ] = useState(0);
  const [ timeSelection, setTimeSelection ] = useState(0);

  return (
    <Grid>
      <Box bg={"white"} p={10}>
        <TimeContext.Provider value={{
          timeCursor,
          setTimeCursor,
          timeSelection,
          setTimeSelection}}>
          <DashboardGrid />
        </TimeContext.Provider>
      </Box>
    </Grid>
  );
};
