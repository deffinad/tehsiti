import { useRoute } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../contains'
import DropDownPicker from 'react-native-dropdown-picker'
import { getRuasJalan, getRuasJalanById } from '../../services'
import { FontAwesome5 } from '@expo/vector-icons';

const Detail = ({ navigation }) => {
    const route = useRoute()
    const { id, name, type } = route.params
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(id);
    const [items, setItems] = useState([]);

    const [detailRuas, setDetailRuas] = useState({})
    useEffect(() => {
        setItems([])
        getRuasJalan(type)
            .then(data => {
                let arr = []
                data.data.map(value => {
                    arr.push({
                        label: value.ruas_jalan,
                        value: value.no_ruas
                    })
                })
                setItems(arr)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    useEffect(() => {
        getRuasJalanById(value, type)
            .then(data => {
                setDetailRuas(data.data)
            })
            .catch(err => {
                console.error(err);
            })
    }, [value])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', display: 'flex', gap: 16 }}>
            <StatusBar style="auto" backgroundColor={COLORS.primary} />
            <View style={{ backgroundColor: COLORS.primary, padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <View style={{ backgroundColor: 'white', borderRadius: 100, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5 name='chevron-left' size={18} />
                    </View>
                </Pressable>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Rekapitulasi Data Kinerja Ruas Jalan Kota Sukabumi Tahun 2023</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{ borderColor: 'transparent' }}
                    dropDownContainerStyle={{ backgroundColor: 'white', borderColor: 'grey' }}
                    zIndex={1000}
                    searchable={true}
                    listMode="MODAL"
                />
            </View>

            <View style={{ paddingHorizontal: 24, display: 'flex', gap: 24, zIndex: -1 }}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 28, textTransform: 'capitalize' }}>{detailRuas.ruas_jalan}</Text>
                    <Text style={{ fontSize: 16 }}>No Ruas : {detailRuas.no_ruas}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                    <View style={{ width: 4, backgroundColor: COLORS.secondary, borderRadius: 3 }} />
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Keterangan</Text>
                </View>

                <View>
                    <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                    <View style={{ width: 4, backgroundColor: COLORS.secondary, borderRadius: 3 }} />
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Data</Text>
                </View>

                <View style={{ display: 'flex', gap: 8 }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ width: 150 }}>Panjang</Text>
                        <Text style={{ flex: 1 }}>{detailRuas.panjang === 0 || detailRuas.panjang === undefined ? '-' : detailRuas.panjang + ' km'} </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ width: 150 }}>Kapasitas Jalan</Text>
                        <Text style={{ flex: 1 }}>{detailRuas.kapasitas_jalan === 0 || detailRuas.kapasitas_jalan === undefined ? '-' : detailRuas.kapasitas_jalan}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ width: 150 }}>Volume Lalu Lintas</Text>
                        <Text style={{ flex: 1 }}>{detailRuas.volume_lalu_lintas === 0 || detailRuas.volume_lalu_lintas === undefined ? '-' : detailRuas.volume_lalu_lintas}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ width: 150 }}>Lebar Jalan Efektif</Text>
                        <Text style={{ flex: 1 }}>{detailRuas.lebar_jalan_efektif === 0 || detailRuas.lebar_jalan_efektif === undefined ? '-' : detailRuas.lebar_jalan_efektif + ' m'}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ width: 150 }}>Kecepatan Rata-rata</Text>
                        <Text style={{ flex: 1 }}>{detailRuas.kecepatan_rata === 0 || detailRuas.kecepatan_rata === undefined ? '-' : detailRuas.kecepatan_rata + ' km/jam'}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ width: 150 }}>V/C Ratio</Text>
                        <Text style={{ flex: 1 }}>{detailRuas.vc_ratio === 0 || detailRuas.undefined === 0 ? '-' : detailRuas.vc_ratio}</Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Detail