
// TELA DO GAME COM OS ANUNCIOS.

import { useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context'
import {View, TouchableOpacity, Image, FlatList, Text} from 'react-native'

import { GameParams } from '../../@types/navigation';
import {useRoute, useNavigation} from '@react-navigation/native'

import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';

import { styles } from './styles';
import {Entypo} from '@expo/vector-icons'
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'
import { DuoCard, DuoCardProps } from '../../components/DuoCard';



export function Game() {

  const [duos, setDuos] = useState<DuoCardProps[]>([])

  const route = useRoute()
  const game = route.params as GameParams;
  
  const navigation = useNavigation()
  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(()=> {
    fetch(`http://192.168.15.8:3333/games/${game.id}/ads`)
    .then(response=> response.json())
    .then(data=> {setDuos(data)})

  }, [])

  return (
    <Background>
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Entypo // Icone de ( < )
                      name='chevron-thin-left'
                      color={THEME.COLORS.CAPTION_300}
                      size={20}
                    />
                </TouchableOpacity>

                <Image
                  source={logoImg}
                  style={styles.logo}
                />

                <View style={styles.right}/>
            </View>
            
            <Image // Imagem do jogo na página de anúncio
              source={{uri: game.bannerUrl}}
              style={styles.cover}
              resizeMode='contain'
            />
            
            <Heading
              title={game.title}
              subtitle='Conecte-se e comece a jogar!'
            />

            <FlatList // Lista com os anúncios.
              data={duos}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <DuoCard 
                data={item}
                onConnect={() => {}}
                />
              )}
              horizontal
              style={styles.containerList}
              contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent} // Verificação se há conteudo e estilização para cada
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={()=> ( // Mensagem para caso a lista esteja vazia
                <Text style={styles.emptyListText}>
                  Não há anúncio ainda!
                </Text>
              )}
            />
            
        </SafeAreaView>
    </Background>
    
  );
}