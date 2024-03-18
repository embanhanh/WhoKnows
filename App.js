import {  ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import Home from './src/screens/Home';
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import { auth } from './firebaseconfig';
import userContext from './src/AuthContext/AuthProvider';
import Room from './src/screens/Room';

const Stack = createStackNavigator()

export default function App() {
  const [user, setUser] = useState(null)
  
  const [isloading, setIsloading] = useState(true)
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,
      async authuser =>{
        authuser ? setUser(authuser) : setUser(null)
        setIsloading(false)
      }
    )
    return () => unsubscribe()
  },[user])

  if(isloading){
    return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <ActivityIndicator size="large" color="black"></ActivityIndicator>
    </View>)
  }

  return (
    <userContext.Provider value={{user}}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown: false}} >
          {
            user ? (<><Stack.Screen name='Home' component={Home}></Stack.Screen>
            <Stack.Screen name='Room' component={Room}></Stack.Screen></>) :
            (<><Stack.Screen name='Signin' component={Signin} ></Stack.Screen>
            <Stack.Screen name='Signup' component={Signup} ></Stack.Screen></>)
          }  
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}

