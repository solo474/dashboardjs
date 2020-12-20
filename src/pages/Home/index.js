import { Box, Image, Text } from 'rebass';
import { Grid } from 'theme-ui';

import React, { useState } from 'react';
import { Link } from '@reach/router';
import astroids from './astroids.jpg';
import profile from './profile.png';
import webpagetest from './webpagetest.png';
import { Switch } from '@modulz/radix';

export default ({theme,setTheme}) => {
  return <Box>
    <Box height={'70px'} sx={{
      borderBottom: '1px solid gray'
    }}>
      <Grid columns={['200px 1fr 100px 100px']}>
        <Box>
          <Text color={'text'}>  </Text>
        </Box>
        <Box textAlign={'left'} p={'1.4rem'}>
          <Text color={'text'} sx={{
            fontSize: '1.4rem'
          }}> Good Evening,  </Text>
        </Box>
        <Box p={'1.4rem'}>
          <Switch
            xs={{
              cursor: 'pointer'
            }}
            onChange={()=>{
            theme === 'light'
              ? setTheme('dark')
              : setTheme('light');
          }}/>
        </Box>
        <Box p={'1rem'}>
          <Image
            src={profile}
            sx={{
              height: '40px',
              width: '40px',
              borderRadius: '40px'
            }}
          />
        </Box>
      </Grid>
    </Box>
    <Grid columns={['0px 1fr','240px 1fr']}>
    <Box height={'100vh'}>
      <SideBar/>
    </Box>
    <Box>

          <N/>
    </Box>
  </Grid></Box>
};

export const N = () => {
  const [list,setList]  = useExplore();

  return  list ? <Box height={'100vh'} bg={'accent'}>
    <Grid
      columns={[
        '1fr',
        '1fr 1fr',
        '1fr 1fr 1fr 1fr',
        '1fr 1fr 1fr 1fr',
      ]}
      gap={'4rem'}
      p={'5rem'}
    >
      <AddNew />
      { list.list.map(({id,title,image}) => <Card
        id={id}
        image={{
          src: 'https://picsum.photos/200/300',
        }}
        title={title}
      />) }
    </Grid>
  </Box> : "loading...";
}

const Card = ({ children, title, image,id, ...remaininggProps }) => {
  return <Box


  >
    <Link to={`/choreography/${id}/tag-line`}><Box
      {...remaininggProps}
      bg={'white'}
      height={'10rem'}
      sx={{
        boxShadow: '',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}


    >
      {children || <Box
        {...image}
        height={'10rem'}
        width={'100%'}
        sx={{
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
          background: `url(${image.src})`,
          width: '100%',
          backgroundSize: 'cover'
        }}
      />}
    </Box></Link>
    <Text
      fontSize={'1.1rem'}
      textAlign={'left'}
      p={2}
      color={'text'}
    >
      {title}
    </Text>
  </Box>;
};

const AddNew = () => {
  return <Card p={'2rem'} bg={'highlight'}>
    <Box
      sx={{
        border: '4px dashed grey',
      }}
      textAlign={'center'}
      p={'2rem'}

    >
     Create new
    </Box>
  </Card>;
};

const SideBar = () => {
  return <Box
    height={'100vh'}
    sx={{
    borderRight: '1px solid gray'
  }}
  >
    <SideBarItem>
      New choreography
    </SideBarItem>
    <SideBarItem selected={true}>
     My Choreographs
    </SideBarItem>
    <SideBarItem>
      Shared with me
    </SideBarItem>
  </Box>
}

const SideBarItem = (props) => {
  return <Box {...props}

              textAlign={'left'}
              p={'1.4rem'}
              bg={props.selected ? 'highlight' : 'background'}
              sx={{
                cursor: 'pointer'
              }}
  >
    <Text
      sx={{
        fontSize: '1.2rem'
      }}
      color={'text'} >
      {props.children}
    </Text>
  </Box>
};


function useExplore(){
  const [list,setList] = useState({
    list: []
  });

  fetch('https://www.vzsandbox.com/api/explore/1.json')
    .then( data => data.json())
    .then( data => {
      setList(data);
    });

  return [
    list,
    setList
  ]
}

