import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome6, AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import Home from '../screens/Home';
import ChatBox from '../screens/ChatBox';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarStyle: {
        borderRadius: 10,
        height: "8%",
        position: "absolute",
        bottom: "4%",
        left: "6%",
        right: "6%",
      }
    }}
    >
      <Tab.Screen name="Home" component={Home} 
      options={{
        tabBarLabel:({color}) => (
          <Text style={{color: color, fontSize: 12, marginBottom: "3%"}}>Trang chủ</Text>
        ),
        tabBarIcon:({color, size}) => (
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <FontAwesome name='home' size={size} color={color} />
          </Animatable.View>
        ),
      }}
      />
      <Tab.Screen name="Chat" component={ChatBox} 
      options={{
        tabBarLabel:({color}) => (
          <Text style={{color: color, fontSize: 12, marginBottom: "3%"}}>Chat</Text>
        ),
        tabBarIcon:({color, size}) => (
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <FontAwesome6 name='message' size={size} color={color} />
          </Animatable.View>
        ),
      }}
      />
      <Tab.Screen name="Profile" component={Profile} 
      options={{
        tabBarLabel:({color}) => (
          <Text style={{color: color, fontSize: 12, marginBottom: "3%"}}>Hồ sơ</Text>
        ),
        tabBarIcon:({color, size}) => (
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <FontAwesome name='user-circle' size={size} color={color} />
          </Animatable.View>
        ),
      }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 12,
    marginBottom: "3%",
  }
});