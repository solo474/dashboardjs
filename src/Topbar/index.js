import { Box, Flex, Text } from 'rebass';
import React from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

export const Topbar = () => {

  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();


  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  return  <Flex
    px={2}
    color='white'
    bg='skyblue'
    alignItems='center'>
    <Box mx='auto' />

    <Text p={2} fontWeight='bold'>
       Hello, {user ? user.username : ''}
    </Text>
  </Flex>;
};
