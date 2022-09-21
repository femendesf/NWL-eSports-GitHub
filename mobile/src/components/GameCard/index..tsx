import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType, Text } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

export interface GameCardProps{
    id: string;
    name: string;
    ads: string;
    cover: ImageSourcePropType;
}

interface Props extends TouchableOpacityProps{
    data: GameCardProps;

}

export function GameCard({data, ...res}: Props) {
  return (
    <TouchableOpacity style={styles.container} {...res}>

        <ImageBackground // Area da Imagem
            style={styles.cover}
            source={data.cover}
        >

            <LinearGradient // espaço onde irão ficar as informações
                colors={THEME.COLORS.FOOTER}
                style={styles.footer}
            >
                <Text style={styles.name}> 
                    {data.name}
                </Text>

                <Text style={styles.ads}>
                    {data.ads} anúncios
                </Text>


            </LinearGradient>

        </ImageBackground>
            

        

    </TouchableOpacity>
  );
}