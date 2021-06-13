import React, {useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import IventScreen from './IventScreen';
import IventScreen from './IventScreen';

import {AuthContext} from "../context/authContext";

const Stack = createStackNavigator();

const RouteHome = () => {
  const auth = useContext(AuthContext);

  return ( 
      <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeScreen} 
          options={{
            headerShown: false
            // headerTitle: "",
            // headerRight: () => (
            //     <View style={styles.header}>
            //       <Pressable 
            //       style={styles.headerButton}
            //       onPress={() => {auth.logout();}}
            //       >
            //           <Text style={styles.text}>
            //             Выйти
            //         </Text>
            //       </Pressable>
            //     </View>
            //   ),
            // headerTintColor: '#000',
          }}
          />
          <Stack.Screen name='MyIvent' component={IventScreen} 
          options={{
            headerTitle: "Мероприятие",
            headerTintColor: '#000',
          }}
          />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButton: {
      marginLeft: 25,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginRight: 16,
  },
  text: {
    color: 'red',
  }
});

export default RouteHome;