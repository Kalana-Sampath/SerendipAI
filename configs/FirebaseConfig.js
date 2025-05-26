import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
//@ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCHlW_4pt2imPFAa3vyIadrirBTQvFnTnM",
  authDomain: "ai-travel-planner-e3f91.firebaseapp.com",
  projectId: "ai-travel-planner-e3f91",
  storageBucket: "ai-travel-planner-e3f91.firebasestorage.app",
  messagingSenderId: "806573679811",
  appId: "1:806573679811:web:ad537a9c2720381f36ee76",
  measurementId: "G-EKV2HX3CR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
});

