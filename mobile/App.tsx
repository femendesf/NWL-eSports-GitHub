import { StatusBar } from "react-native";


import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import { Background } from "./src/components/Background";

import "../mobile/src/services/notificationConfigs"


export default function App() {

  const [fonts] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  return (
    <Background>
      
      <StatusBar
        barStyle= "light-content"
        backgroundColor='transparent'
        translucent
      />

      {fonts ? <Routes/> : <Loading/>}
      
    </Background>
  );
}


