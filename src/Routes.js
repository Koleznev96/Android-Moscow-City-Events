import React, {useContext, useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from "./context/authContext";

import HomeScreen from './screens/HomeScreen';
import MyIventsScreen from './screens/my/MyIventsScreen';
import TicketScreen from './screens/my/TicketScreen';
import IventScreen from './screens/IventScreen';
import IventsScreen from './screens/IventsScreen';
import AuthorizationScreen from './screens/AuthorizationScreen';

import {HeaderButton, status} from './components/HeaderButton'

const Stack = createStackNavigator();

export const Routes = isAuthenticated => {
  const auth = useContext(AuthContext);
  const [statusSeting, setStatusSeting] = useState(false);
  // useEffect(() => {
  //   auth.login(3);
  // }, [auth.login]);

  const config = {
    screens: {
      event: 'afisha/event/:itemId',
    },
  };

  const linking = {
    prefixes: ['https://www.mos.ru', 'ivents://'],
    config,
  };

  // {isAuthenticated ? (
  //   ) : (
  //     <Stack.Navigator initialRouteName='Login'>
  //       <Stack.Screen name='Login' component={AuthorizationScreen} />
  //     </Stack.Navigator>
  //   )}

  return ( 
    <NavigationContainer linking={linking}>
      {/* {isAuthenticated ? ( */}
      <Stack.Navigator>
        <Stack.Screen name='Login' component={AuthorizationScreen} options={{headerShown: false}}/>
        <Stack.Screen name ='Home' component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name ='Ivents' component={IventsScreen} options={{headerShown: false}}/>
        <Stack.Screen name ='MyIvents' component={MyIventsScreen} options={{headerShown: false}}/>
        <Stack.Screen name ='event' component={IventScreen} 
        options={{
          headerTitle: "Мероприятие",
          headerTintColor: '#000',
        }}
        />
        <Stack.Screen name ='Ticket' component={TicketScreen} 
        initialParams={{statusSeting: status}}
        options={{
          headerTitle: "Билет",
          headerRight: () => (
              <HeaderButton />
            ),
          headerTintColor: '#000',
        }}
        />
      </Stack.Navigator>
      {/* ) : (
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={AuthorizationScreen} />
        </Stack.Navigator>
      )} */}
    </NavigationContainer>
  );
}