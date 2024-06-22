import { Platform } from "react-native";
import io from "socket.io-client";

// export const BaseUrl = Platform.OS === 'android'?  'http://192.168.1.8:3000': 'https://servergame-ig01.onrender.com';
export const socket = io('https://servergame-ig01.onrender.com')
