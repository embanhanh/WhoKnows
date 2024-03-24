import {  ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { setDoc, doc, deleteDoc } from "firebase/firestore";

import Home from './src/screens/Home';
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import { auth,database } from './firebaseconfig';
import userContext from './src/AuthContext/AuthProvider';
import GameScreen from './src/screens/GameScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import Profile from './src/screens/Profile';

const Stack = createStackNavigator()

export default function App() {
  const [user, setUser] = useState(null)
  
  const [isloading, setIsloading] = useState(true)
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,
      async authuser =>{
        if(authuser){
          setUser(authuser)
          console.log(authuser?.uid)
          const userRef = doc(database, 'user',authuser?.uid)
          setDoc(userRef,{
              displayName : authuser?.displayName,
              email: authuser?.email,
              phoneNumber: authuser?.phoneNumber,
              photoURL: authuser?.photoURL,
              userId: authuser?.uid
          },{merge: true})
        } else{
          console.log("out");
          setUser(null)
        }
        setIsloading(false)
      }
    )
    return () => unsubscribe()
  },[user])

  if(isloading){
    return <LoadingScreen />;
  }

  return (
    <userContext.Provider value={{user}}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown: false}} >
          {
            user ? (<><Stack.Screen name='Home' component={Home}></Stack.Screen>
            <Stack.Screen name='GameScreen' component={GameScreen}></Stack.Screen>
            <Stack.Screen name='Profile' component={Profile}></Stack.Screen></>) :
            (<><Stack.Screen name='Signin' component={Signin} ></Stack.Screen>
            <Stack.Screen name='Signup' component={Signup} ></Stack.Screen></>)
          }  
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}

