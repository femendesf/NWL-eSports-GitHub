import React from 'react';
import { ImageBackground} from 'react-native';

import { styles } from './styles';
 
import backgroundImg from '../../assets/background-galaxy.png' // Importação só vai ser feita se fizer a tipagem dos arquivos PNG. A tipagem PNG esta definida na pasta @types, que é onde estão centralizadas as tipagens.

interface Props {
    children:React.ReactNode;
}


export function Background({children}: Props) {
  return(
    <ImageBackground 
    source={backgroundImg}
    defaultSource={backgroundImg} // defaultSource memoriza a imagem padrão, por isso está sendo definido novamente para carregar mais rápido.
    style={styles.container}>
      {children}
    </ImageBackground>
  )

}