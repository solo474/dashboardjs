import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Box,Button } from 'rebass';
import { Portal } from 'react-portal';
import Draggable from 'react-draggable'; // The default

import $script from 'scriptjs';
import { Grid } from 'theme-ui';
import { FaCarrot, FaCog, FaCross, FaWindowClose } from 'react-icons/fa';
import { DropdownMenu, Menu, MenuItem, MenuItemLabel, MenuItemSeparator,ChromelessButton } from '@modulz/radix';

export const IdataApp = React.memo(({i,h = null,onAppChange = () => null,apps }) => {

  const initialAppId = apps[i].name;

  const [settingsOpen,setSettingsOpen] = useState(false);
  const [appId,setAppId] = useState( initialAppId || 'random-timeseries');
  const [selectedAppId,setSelectedAppId] = useState(initialAppId || 'random-timeseries');

console.log(initialAppId);
  useEffect(()=>{
    window.onmessage = function(event){
      if (/idata-app-/.test(event.data)) {
        setSelectedAppId(event.data.replace('idata-app-',''));
      }
    };
  });

  useLayoutEffect(()=>{
    $script(`//unpkg.com/@idata-apps/${appId}`, function() {
      window[`idata-apps-${appId}`].default.render(`panel-${i}`,{id: i})
    });
    onAppChange({
      appId: appId,
      i: i,
    });
  },[appId]);

  return <div>
    <Box


      sx={{
        borderBottom: "1px solid #e5e5e5"
      }}
    >
      <Grid
        columns="1fr 40px"
      >
        <Box data-drag={'data-drag'} p={2} > </Box>
        <Box sx={{ textAlign: 'center' }} p={2} >
          <SettingsMenu
            setSettingsOpen={setSettingsOpen}
            settingsOpen={settingsOpen}
          />
        </Box>
      </Grid>
    </Box>
    <div id={`panel-${i}`} style={{ height: h*30+'px' }} ></div>

    { settingsOpen ? <Portal>
      <Draggable >

      <Box

      bg={'white'}
      border={1}
      width={'80%'}
      height={'600px'}
      transform={' rotateX(90)'}
      sx={{
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        position: 'fixed',
        zIndex: '9999',
        top: '10%',
        left: '10%',
        }}
      >
        <Box
          bg={'white'}
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
              <FaWindowClose style={{ textAlign: 'right', cursor: 'pointer' }}
                     onClick={() => {
                       setSettingsOpen(!settingsOpen);
                     }}
              />
            </Box>
          </Grid>
        </Box>
      <iframe
        frameBorder="0"
      src={'https://speed-sandbox-site.vercel.app/selector'}
      width={'100%'}
      height={'550px'}

      />
      <Box bg={'white'}  sx={{
        borderTop: '1px solid #e5e5e5',
        display: 'grid',
        gridTemplateColumns: '7fr 100px'}}>
        <Box>

        </Box>
        <Box p={2}>

          <Button
            onTouchStart={(event)=>{
              event.stopPropagation();
              event.preventDefault();
            }}
            onClick={(event)=>{
            event.stopPropagation();
            setAppId(selectedAppId);
            setSettingsOpen(!settingsOpen);
          }}>
            Select
          </Button>
        </Box>
      </Box>

    </Box>
        </Draggable>
    </Portal> : null }
  </div>;
});


function SettingsMenu({setSettingsOpen,settingsOpen}) {
  return (

    <DropdownMenu
      button={ <ChromelessButton><FaCog style={{ textAlign: 'right', cursor: 'pointer' }}

      /></ChromelessButton>}
      menu={
        <Menu>
          <MenuItem label="change data app" onSelect={()=>{
              setSettingsOpen(!settingsOpen);
          }} />
          <MenuItem label="Data sources" />
          <MenuItem label="Events" />
          <MenuItemSeparator />
          <MenuItemLabel>An item label</MenuItemLabel>
        </Menu>
      }
    />
  );
}
