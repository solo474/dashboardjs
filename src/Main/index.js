import React, { createContext, useContext, useState, useEffect } from "react";
import { Grid, Box } from "theme-ui";
import RGL, { WidthProvider} from "react-grid-layout";
import { FaCog } from 'react-icons/fa';

import { useDashboard } from "./dashboard";
import { TimeContext } from "../Time";

import { SingleStat } from '../Panels/SingleStat';
import { TimeSeries } from '../Panels/TimeSeries';
import { AuditAnalyzer } from '../Panels/AuditAnalyzer';
import { TimeRange } from '../Panels/TimeRange';
import { Filter } from '../Panels/Filter';
import { World } from '../Panels/World';
import { IdataApp } from '../Panels/IdataApp';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Helmet } from 'react-helmet';
import { localDashboards } from './dashboard';

const ReactGridLayout = WidthProvider(RGL);

const a = localDashboards;

const GridElement = ({topBar = true,...props}) => {
  console.log(a);
  const [settingsOpen,setSettingsOpen] = useState(false);
  return (
    <Box
      p={0}
      bg={"background"}
      sx={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      }}
      {...props}
    >
      { topBar !== false ? <Box
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
          <Box sx={{ textAlign: 'right' }}  >
            <FaCog style={{ textAlign: 'right', cursor: 'pointer' }}
              onClick={() => {
                setSettingsOpen(!settingsOpen);
              }}
            />
          </Box>
        </Grid>
      </Box> : null }
      {props.children}
    </Box>
  );
};

const Panels = {
  TimeRange,
  Filter,
  TimeSeries,
  AuditAnalyzer,
  World,
  IdataApp,
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
    topBar: false,
    panel: 'IdataApp'
  },
  '5': {
    w: 12,
    h: 7,
    panel: 'AuditAnalyzer'
  }
};

const DashboardGrid = ({id}) => {
   const { dashboard,setDashboard,updateLayout } = useDashboard({id});
      const layout = dashboard.layout
        ? dashboard.layout.map((data) => {
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
          content: <Panel {...content} {...data} apps={dashboard.apps} onAppChange={(app) => {

           }
          }/>
        }
      }) : [];


    useEffect(()=>{
      const eventListener = document.addEventListener('addnewdataapp',()=>{

      });

      return () =>{
        document.removeEventListener('addnewdataapp',eventListener);
      }
    },[])

    return (
      <div style={{ position: "relative" }}>
        <Helmet>
          <title> { dashboard.title } </title>
        </Helmet>
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          draggableHandle={'[data-drag]'}
          onLayoutChange={(layout) => {
            updateLayout('1',layout);
          }}
        >
          {layout.map(data => {
            return (
              <GridElement key={data.i} topBar={false} >
                {data.content}
              </GridElement>
            );
          })}
        </ReactGridLayout>
      </div>
    );
}

export const Main = ({id}) => {
  const [ timeCursor, setTimeCursor ] = useState(0);
  const [ timeSelection, setTimeSelection ] = useState(0);

  return (
    <Grid>
      <Box bg={"gray"} p={10}>
        <TimeContext.Provider value={{
          timeCursor,
          setTimeCursor,
          timeSelection,
          setTimeSelection}}>
          <DashboardGrid id={id}/>
        </TimeContext.Provider>
      </Box>
    </Grid>
  );
};
