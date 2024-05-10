
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const SoundVolumeContext = createContext();

export const SoundVolumeProvider = ({ children }) => {
    const [volume, setVolume] = useState(1.0);

    async function playSound(filepath) {
        const { sound } = await Audio.Sound.createAsync(filepath,{volume});
        await sound.playAsync();
    }
    
    useEffect(() => {
        const fetchVolume = async () => {
      try {
          const storedVolume = await AsyncStorage.getItem('appVolume');
          if (storedVolume !== null) {
              setVolume(parseFloat(storedVolume));
            }
        } catch (error) {
            console.error('Error fetching volume:', error);
        }
    };
    fetchVolume();
}, []);

useEffect(() => {
    const saveVolume = async () => {
        try {
            await AsyncStorage.setItem('appVolume', volume.toString());
        } catch (error) {
            console.error('Error saving volume:', error);
        }
    };
    saveVolume();
}, [volume]);

return (
    <SoundVolumeContext.Provider value={{ volume, setVolume, playSound }}>
      {children}
    </SoundVolumeContext.Provider>
  );
};

export  default SoundVolumeContext