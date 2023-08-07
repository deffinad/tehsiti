import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../contains'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import TopTabs from '../../components/TopTabs'
import { FontAwesome5 } from '@expo/vector-icons'

const HEIGHT = Dimensions.get('window').height - 80;

const RuasJalan = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <View style={{ display: 'flex', justifyContent: 'center', padding: 24, alignItems: 'center' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 24 }}>
                    <View style={{ borderRadius: 100, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5 name='chevron-left' size={18} />
                    </View>
                </Pressable>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Informasi Jalan</Text>
                </View>
            </View>

            <View style={{ paddingHorizontal: 24, flex: 1 }}>
                <TopTabs />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        display: 'flex',
        flexDirection: 'column',
    },
})

export default RuasJalan