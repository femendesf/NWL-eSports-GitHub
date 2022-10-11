import{ useEffect, useRef }from 'react' // Para manipular os elementos da arvore de forma direta.
import { StatusBar } from "react-native";
import * as Notifications from 'expo-notifications';

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
import './src/services/getPushNotification';
import { Subscription } from 'expo-modules-core';
import { getPushNotificationToken } from './src/services/getPushNotification';


export default function App() {

  const [fonts] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotificationListener = useRef<Subscription>(); // Para ficar observando quando chega notificação.
  const responseNotificationListener = useRef<Subscription>(); // Envia uma resposta para notificação.

  useEffect(() => {
    getPushNotificationToken() // Para conseguir obter o token, precisamos logar no expo (logar pelo terminal: expo login)
  }, []);

  useEffect( () => {
    getNotificationListener.current =  Notifications.addNotificationReceivedListener(notification => {
      console.log(notification); // Fica observando as notificações que recebemos
    });

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response) // Fica observando a notificação que enviamos
    });


    return () => { // Limpa os Listerners da memória
      if( responseNotificationListener.current && getNotificationListener.current ){
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current)
      }
    }
  }, []) 



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


