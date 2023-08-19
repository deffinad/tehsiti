import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../contains';
import { FontAwesome5 } from '@expo/vector-icons';

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

                <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: item.type === 'kota' ? 'green' : item.type === 'provinsi' ? 'orange' : item.type === 'nasional' ? 'red' : 'blue' }}></View>
                    <Text style={{ textTransform: 'capitalize' }}>{item.type}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', gap: 4, marginTop: 8 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 6, paddingVertical: 1, backgroundColor: '#e3e3e3', borderRadius: 10 }}>
                        <Text style={{ fontWeight: '600', color: '#61615f' }}>Panjang</Text>
                        <Text style={{ color: '#61615f' }}>{item.panjang === 0 || item.panjang === undefined ? '-' : `${item.panjang.toFixed(2)} km`}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 6, paddingVertical: 1, backgroundColor: '#e3e3e3', borderRadius: 10 }}>
                        <Text style={{ fontWeight: '600', color: '#61615f' }}>Kapasitas</Text>
                        <Text style={{ color: '#61615f' }}>{item.kapasitas_jalan === 0 || item.kapasitas_jalan === undefined ? '-' : item.kapasitas_jalan.toFixed(2)}</Text>
                    </View>
                </View>
            </Card>
        </Pressable>
    );
};


export const CardInformasiItem = ({ item, index, onClick }) => {
    return (
        <Pressable key={index} onPress={onClick}>
            <Card style={{ display: 'flex', gap: 5, width: 100, height: 100, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ position: 'relative' }}>
                    <View style={{ width: 45, height: 45, backgroundColor: COLORS.primary, borderRadius: 100 }}></View>
                    <View style={{ position: 'absolute', right: -3, top: 5 }}>
                        <FontAwesome5 name={item.icon} color={COLORS.secondary} size={28} />
                    </View>
                </View>
                <Text>{item.label}</Text>
            </Card>
        </Pressable>
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