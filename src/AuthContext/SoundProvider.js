
import React, { createContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const SoundVolumeContext = createContext();

export const SoundVolumeProvider = ({ children }) => {
    const [volume, setVolume] = useState(1.0);
    const backgroundMusicRef = useRef(null);

    async function playSound(filepath) {
        const { sound } = await Audio.Sound.createAsync(filepath,{volume});
        await sound.playAsync();
    }

    async function playBackgroundMusic(filepath) {
        if (backgroundMusicRef.current) {
            await backgroundMusicRef.current.unloadAsync();
        }
        const { sound } = await Audio.Sound.createAsync(filepath, { volume, isLooping: true });
        backgroundMusicRef.current = sound;
        await sound.playAsync();
    }

    async function stopBackgroundMusic() {
        if (backgroundMusicRef.current) {
            await backgroundMusicRef.current.unloadAsync();
            backgroundMusicRef.current = null;
        }
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

useEffect(() => {
    if (backgroundMusicRef.current) {
        backgroundMusicRef.current.setVolumeAsync(volume);
    }
}, [volume]);

return (
    <SoundVolumeContext.Provider value={{ volume, setVolume, playSound, playBackgroundMusic, stopBackgroundMusic }}>
      {children}
    </SoundVolumeContext.Provider>
  );
};

export  default SoundVolumeContext