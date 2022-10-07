
import {Image, FlatList } from 'react-native'; // Componente FlatList para exibir uma lista
import {SafeAreaView} from 'react-native-safe-area-context'
import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard, GameCardProps } from '../../components/GameCard/index.';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import { GAMES } from '../../utils/games';
import {useState, useEffect} from "react"
import React from 'react';
import { Background } from '../../components/Background';
import {useNavigation} from '@react-navigation/native'


export function Home() {

  

  const [games, setGames]= useState<GameCardProps[]>([])

  useEffect(()=>{
    fetch("http://192.168.15.11:3333/games")
    .then(response => response.json())
    .then(data => setGames(data))
  }, [])
  
  const navigation = useNavigation()

  function handleOpenGame({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game',{id, title, bannerUrl})
  }
  
  return (
    <Background>
      <SafeAreaView style={styles.container}>

        <Image //LOGO
          source={logoImg}
          style={styles.logo}
        />

        <Heading //MENSAGEM ABAIXO DA LOGO
        title='Encontre seu duo!'
        subtitle='Selecione o game que deseja jogar...'
        />

        <FlatList
          data={games}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <GameCard // JOGO
              data={item} // Imagem do jogo com a informação
              onPress={() => handleOpenGame(item)} // Tipagem para chamar função que tem parâmetros.
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
        

      </SafeAreaView>
    </Background>
  );
}