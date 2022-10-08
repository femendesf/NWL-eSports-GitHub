import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Heading } from '../Heading';
import {MaterialIcons} from '@expo/vector-icons'
import { CheckCircle} from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';
import React, { useState } from 'react';

interface Props extends ModalProps{
    discord: string;
    onClose: () => void
}

export function DuoMatch({discord, onClose, ...rest}: Props ) {

    const [isCopping, setIsCoping] = useState(false)

    async function handleCopyDiscordToClipboard() {

        setIsCoping(true)
        await Clipboard.setStringAsync(discord)

        Alert.alert('Discord Copiada!', 'Usuário copiado com sucesso!')
        setIsCoping(false)
    }
    
    return (
        <Modal
            animationType='fade'
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>

                <View style={styles.content}>

                    <TouchableOpacity // Botão para fechar o modal
                        style={styles.closeIcon}
                        onPress={onClose}
                    >

                        <MaterialIcons
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight= 'bold'
                    />

                    <Heading
                        style={{alignItems: 'center', marginTop: 24}}
                        title="Let's play!"
                        subtitle='Agora é só começar a jogar!'
                    />

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity // Botão com discord do usuário
                        onPress={handleCopyDiscordToClipboard}
                        style={styles.discordButton}
                        disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                        </Text>
                    </TouchableOpacity>    
                    
                </View>

            </View>
        </Modal>
    );
}