import { Platform } from "react-native";
import io from "socket.io-client";

<<<<<<< HEAD
export const BaseUrl = Platform.OS === 'android' ?  'http://localhost:3000': 'http://10.0.2.2:3000';
export const socket = io('http://172.20.55.0:3000')
=======
>>>>>>> fe5a6ecde4ffdba2e97e030d2e7900aa6d75cc7f

export const BaseUrl = Platform.OS === 'android'?  'http://localhost:3000': 'http://10.0.2.2:3000';
export const socket = io('http://172.16.1.2:3000')
