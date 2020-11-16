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
import { World } from '../Panels/World';
import { IdataApp } from '../Panels/IdataApp';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
const ReactGridLayout = WidthProvider(RGL);

const GridElement = ({topBar = true,...props}) => {
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


const DashboardGrid = () => {
    // layout is an array of objects, see the demo for more complete usage
    const [dashboard,setDashboard] = useState(createDashboard());
    const [layout,setLayout] = useState([]);

    useEffect(()=>{
      window.localStorage.setItem('dashboard',
        JSON.stringify(dashboard));

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
          content: <Panel {...content} {...data} onAppChange={(app) => {
            window.localStorage.setItem('apps',
              JSON.stringify(Object.assign(
                {},
                JSON.parse(window.localStorage.getItem('apps')),
                {
                  [app.i]: app.appId
                }
              )));
           }
          }/>
        }
      });
      setLayout(layout);


    },[dashboard]);

    useEffect(()=>{
      const eventListener = document.addEventListener('addnewdataapp',()=>{
        setDashboard({
          layout: [
            {
              i: "data-app-"+Math.random(), x: 0, y: 7, w: 12, h: 7,
              content: panelIds['4']
            },...layout.map((data) => {
              return {
                ...data,
                content: panelIds[data.i]
              };
            })] });
      });

      return () =>{
        document.removeEventListener('addnewdataapp',eventListener);
      }
    })

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
              const panel = /data-app/.test(data.i)
                 ?  panelIds['4']
                 :  panelIds[data.i]
              return {
                ...data,
                content: panel
              };
            }) });
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

export const Main = () => {
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
          <DashboardGrid />
        </TimeContext.Provider>
      </Box>
    </Grid>
  );
};
