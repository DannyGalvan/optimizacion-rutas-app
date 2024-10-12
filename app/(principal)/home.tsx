import { Logo } from '@/components/icons/Logo';
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
    const {username} = useAuth();
    
    return (
        <View className='bg-white dark:bg-black flex-1 items-center justify-center'>
            <Text className='text-black dark:text-white font-bold text-2xl'>Bienvenido {username?.toUpperCase()}</Text>
            <View style={styles.containerLogo}>
                <Logo isVisible={false} style={styles.logo} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerLogo: {
        marginTop: 50,
        marginBottom: 30,
      },
      logo: {
        width: 300,
        height: 400,
      },
});
