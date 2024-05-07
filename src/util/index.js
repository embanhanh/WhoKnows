import { Platform } from "react-native";
import io from "socket.io-client";

export const BaseUrl = Platform.OS === 'android' ?  'http://localhost:3000': 'http://10.0.2.2:3000';
export const socket = io('http://192.168.43.213:3000')

