import { useRoute } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, Image, View, Dimensions, ScrollView, Button, TouchableOpacity, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../contains'
import DropDownPicker from 'react-native-dropdown-picker'
import { getRuasJalan, getRuasJalanById } from '../../services'
import { FontAwesome5 } from '@expo/vector-icons';
import ShimmerDetail from './ShimmerDetail'

const WIDTH = Dimensions.get('window').width;

const Detail = ({ navigation }) => {
    const route = useRoute()
    const { id, type } = route.params
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(id);
    const [items, setItems] = useState([]);

    const [detailRuas, setDetailRuas] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setItems([])
        getRuasJalan(type)
            .then(data => {
                let arr = []
                data.data.map(value => {
                    arr.push({
                        label: value.ruas_jalan.toLowerCase(),
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
        getRuasJalanById(value)
            .then(data => {
                setDetailRuas(data.data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err);
            })
    }, [value])


    const handleMaps = (link) => {
        Linking.openURL(link)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', display: 'flex', gap: 16 }}>
            <StatusBar style="auto" backgroundColor={detailRuas.type === 'kota' ? 'green' : detailRuas.type === 'provinsi' ? 'orange' : detailRuas.type === 'nasional' ? 'red' : detailRuas.type === 'lingkungan' ? 'blue' : COLORS.primary} />
            <View style={{ backgroundColor: detailRuas.type === 'kota' ? 'green' : detailRuas.type === 'provinsi' ? 'orange' : detailRuas.type === 'nasional' ? 'red' : detailRuas.type === 'lingkungan' ? 'blue' : COLORS.primary, padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
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

            <ScrollView>
                {
                    !loading ? (
                        <View style={{ paddingHorizontal: 24, paddingBottom: 24, display: 'flex', gap: 24 }}>
                            <View style={{ display: 'flex', gap: 8 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 28, textTransform: 'capitalize' }}>{detailRuas.ruas_jalan}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>No Ruas : {detailRuas.no_ruas}</Text>

                                <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                    <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: detailRuas.type === 'kota' ? 'green' : detailRuas.type === 'provinsi' ? 'orange' : detailRuas.type === 'nasional' ? 'red' : 'blue' }}></View>
                                    <Text style={{ textTransform: 'capitalize' }}>{detailRuas.type}</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                                <View style={{ width: 4, backgroundColor: COLORS.secondary, borderRadius: 3 }} />
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>Sumber</Text>
                            </View>

                            <View>
                                <Text style={{ lineHeight: 20, fontStyle: 'italic', fontWeight: '500' }}>
                                    {
                                        detailRuas.type === 'kota' ? 'KP Walikota No. 188.45/ 97 - DPUTR/2023 Perubahan Kedua Atas KP Walikota 164 Th 2011 Tentang Daftar Nama dan Ruas-ruas Jalan Di Wilayah Kota Sukabumi' :
                                            detailRuas.type === 'provinsi' ? 'KP Gubernur Jawa Barat Nomor :620/Kep.884-DBMTR/2022 Tentang Ruas-Ruas Jalan Menurut Statusnya Sebagai Jalan Provinsi' :
                                                detailRuas.type === 'nasional' ? 'KP MENTERI PEKERJAAN UMUM DAN PERUMAHAN RAKYAT NOMOR: 430/KPTS/M/2022 Tentang Penetapan Ruas Jalan Dalam Jaringan Jalan Primer Menurut Fungsinya' : '-'
                                    }
                                </Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                                <View style={{ width: 4, backgroundColor: COLORS.secondary, borderRadius: 3 }} />
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>Data</Text>
                            </View>

                            <View style={{ display: 'flex', gap: 8 }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ width: 150 }}>Panjang</Text>
                                    <Text style={{ flex: 1 }}>{detailRuas.panjang === 0 || detailRuas.panjang === undefined ? '-' : detailRuas.panjang.toFixed(2) + ' km'} </Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ width: 150 }}>Kapasitas Jalan</Text>
                                    <Text style={{ flex: 1 }}>{detailRuas.kapasitas_jalan === 0 || detailRuas.kapasitas_jalan === undefined ? '-' : detailRuas.kapasitas_jalan.toFixed(2)}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ width: 150 }}>Volume Lalu Lintas</Text>
                                    <Text style={{ flex: 1 }}>{detailRuas.volume_lalu_lintas === 0 || detailRuas.volume_lalu_lintas === undefined ? '-' : `${detailRuas.volume_lalu_lintas.toFixed(2)} smp/jam`}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ width: 150 }}>Lebar Jalan Efektif</Text>
                                    <Text style={{ flex: 1 }}>{detailRuas.lebar_jalan_efektif === 0 || detailRuas.lebar_jalan_efektif === undefined ? '-' : detailRuas.lebar_jalan_efektif.toFixed(2) + ' m'}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ width: 150 }}>Kecepatan Rata-rata</Text>
                                    <Text style={{ flex: 1 }}>{detailRuas.kecepatan_rata === 0 || detailRuas.kecepatan_rata === undefined ? '-' : detailRuas.kecepatan_rata.toFixed(2) + ' km/jam'}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ width: 150 }}>V/C Ratio</Text>
                                    <Text style={{ flex: 1 }}>{detailRuas.vc_ratio === 0 || detailRuas.undefined === 0 ? '-' : detailRuas.vc_ratio}</Text>
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity
                                    onPress={() => handleMaps(detailRuas.link_maps)}
                                    activeOpacity={1}
                                    style={{ backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Text style={{ color: 'white', fontSize: 16 }}>Lihat Maps</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    ) : (
                        <ShimmerDetail />
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Detail