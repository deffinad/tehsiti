import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../contains';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const Card = ({ children, style }) => {
    return (
        <View
            style={{
                ...styles.card,
                ...style
            }}
        >
            {children}
        </View>
    )
}

export const CardInformasiJalan = ({ item, index, onClick }) => {
    return (
        <Pressable onPress={onClick} key={index}>
            <Card style={{ display: 'flex', gap: 5, margin: 5, padding: 16, alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 14, }}>{item.no_ruas}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize' }}>{item.ruas_jalan}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 6, paddingVertical: 1, backgroundColor: '#e3e3e3', borderRadius: 10 }}>
                        <Text style={{ fontWeight: '600', color: '#61615f' }}>Panjang</Text>
                        <Text style={{ color: '#61615f' }}>{item.panjang === 0 || item.panjang === undefined ? '-' : item.panjang}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 6, paddingVertical: 1, backgroundColor: '#e3e3e3', borderRadius: 10 }}>
                        <Text style={{ fontWeight: '600', color: '#61615f' }}>Kapasitas</Text>
                        <Text style={{ color: '#61615f' }}>{item.kapasitas_jalan === 0 || item.kapasitas_jalan === undefined ? '-' : item.kapasitas_jalan}</Text>
                    </View>
                </View>
            </Card>
        </Pressable>
    );
};


export const CardInformasiItem = ({ item, index }) => {
    return (
        <Card style={{ display: 'flex', gap: 5, width: 100, height: 100, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ position: 'relative' }}>
                <View style={{ width: 45, height: 45, backgroundColor: COLORS.primary, borderRadius: 100 }}></View>
                <View style={{ position: 'absolute', right: -5, top: 5 }}>
                    <FontAwesomeIcon icon={item.icon} color={COLORS.secondary} size={36} />
                </View>
            </View>
            <Text style={{ fontFamily: 'Lexend-Medium' }}>{item.label}</Text>
        </Card>
    );
};


const styles = StyleSheet.create({
    card: {
        // shadowColor: 'black',
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 6,
        // shadowOpacity: 0.26,
        // elevation: 8,
        backgroundColor: 'white',
        borderRadius: 10
    }
})

export default Card