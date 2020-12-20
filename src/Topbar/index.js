import { Box, Flex, Text } from 'rebass';
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from '../amplifyConfig';
import { Switch,Menu,MenuItem,MenuItemSeparator,MenuItemLabel,DropdownMenu } from '@modulz/radix';
import { Button } from 'rebass';

Amplify.configure(awsconfig);


export const Topbar = ({onThemeChange}) => {

  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();


  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);
  console.log(AuthState);
  return  <Flex
    px={2}
    color='white'
    bg='skyblue'
    alignItems='center'>
    <Box mx='auto' />
    <InsertMenu/>
    <Switch value="accept" onChange={()=>{
      onThemeChange();
    }}/>
    <Text p={2} fontWeight='bold'>
       Hello, {user ? user.username : ''}
    </Text>
    { !user ? <AmplifySignOut/> : '' }
  </Flex>;
};


function InsertMenu() {
  const [isChecked, setIsChecked] = React.useState(true);
  const [value, setValue] = React.useState('2');

  return (
    <DropdownMenu
      button={<Button>Options</Button>}
      menu={
        <Menu>
          <MenuItem label="Add new data app" onSelect={()=>{
            addNewDataApp();
          }} />
          <MenuItem label="Simple item two" />
          <MenuItem label="Simple item three" />
          <MenuItemSeparator />
          <MenuItemLabel>An item label</MenuItemLabel>
        </Menu>
      }
    />
  );
}

function addNewDataApp() {
  var addNewDataAppEvent =  new CustomEvent("addnewdataapp", {});
  document.dispatchEvent(addNewDataAppEvent);
}
