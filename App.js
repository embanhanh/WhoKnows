import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo'
import {  collection, getDocs } from "firebase/firestore";

import Home from './src/screens/Home';
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import { auth,database } from './firebaseconfig';
import userContext from './src/AuthContext/AuthProvider';
import keywordContext from './src/AuthContext/KeywordProvider';
import avatarContext from './src/AuthContext/AvatarProvider';
import GameScreen from './src/screens/GameScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import Profile from './src/screens/Profile';
import { SoundVolumeProvider } from './src/AuthContext/SoundProvider';

const Stack = createStackNavigator()

export default function App() {
  const netinfo = useNetInfo();
  const [user, setUser] = useState(null)
  const [isloading, setIsloading] = useState(true)
  const [keyword, setKeyword] = useState([])
  const [urlAvatar, setUrlAvatar] = useState([])

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,
      async authuser =>{
        if(authuser){
          setUser(authuser)
        } else{
          console.log("out");
          setUser(null)
        }
        setIsloading(false)
      }
    )
    return () => {
      unsubscribe()
    }
  },[user])

  const getKeywords = async ()=>{
    const docRef = collection(database, "keywords")
    const keywords = await getDocs(docRef)
    setKeyword(keywords.docs.map(keyword => keyword.data()))
  }

  const getUrlAvatar = async ()=>{
    const docRef = collection(database,"urlImages")
    const urlAvatar = await getDocs(docRef)
    const final = urlAvatar.docs.map(avatars => avatars.data())
    setUrlAvatar(final[0]?.avatar)
  }
  

  useEffect(()=>{
    getKeywords()
    getUrlAvatar()

    return ()=>{
      console.log('out app');
    }
  },[])

  if(!netinfo.isConnected){
    return <LoadingScreen />;
  }

  if(isloading){
    return <LoadingScreen />;
  }

  return (
    <SoundVolumeProvider>
      <avatarContext.Provider value={urlAvatar}>
        <keywordContext.Provider value={keyword}>
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
        </keywordContext.Provider>
      </avatarContext.Provider>
    </SoundVolumeProvider>
  );
}

