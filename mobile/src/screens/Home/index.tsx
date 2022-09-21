
import { View, Image, FlatList } from 'react-native'; // Componente FlatList para exibir uma lista
import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard } from '../../components/GameCard/index.';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import { GAMES } from '../../utils/games';


export function Home() {
  return (
    <View style={styles.container}>

      <Image //LOGO
        source={logoImg}
        style={styles.logo}
      />

      <Heading //MENSAGEM ABAIXO DO LOGO
      title='Encontre seu duo!'
      subtitle='Selecione o game que deseja jogar...'
      />

      <FlatList
        data={GAMES}
        keyExtractor={item=>item.id}
        renderItem={({item}) => (
          <GameCard // JOGO
            data={item} // Imagem do jogo com a informação
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
      

    </View>

  );
}