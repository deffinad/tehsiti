import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, TextInput, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../contains'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome5 } from '@expo/vector-icons'
import EmptyList from '../../components/EmptyList'
import Card, { CardInformasiJalan } from '../../components/Card'
import { ShimmerCardInformasiJalan } from '../../components/ShimmerCard'
import { getRuasJalan } from '../../services/'
import { useRoute } from '@react-navigation/native'


const RuasJalan = ({ navigation }) => {
    const route = useRoute()
    const { type } = route.params
    const [dataRuas, setDataRuas] = useState([])
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getRuasJalan(type)
            .then(data => {
                setDataRuas(data.data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    const handleSearch = (text) => {
        if (text) {
            const newData = dataRuas.filter((item) => {
                return item.ruas_jalan.toLowerCase().includes(text.toLowerCase()) || item.type.toLowerCase().includes(text.toLowerCase())
            });
            setFilteredData(newData);
            setSearch(text);
        } else {
            setFilteredData(dataRuas);
            setSearch(text);
        }
    };

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
                    <Text style={{ fontSize: 20, fontWeight: '600', textTransform: 'capitalize' }}>
                        {
                            type === 'all' ? 'Informasi Semua Jalan' : 'Informasi Jalan ' + type
                        }
                    </Text>
                </View>
            </View>

            <View style={{ paddingHorizontal: 24, flex: 1 }}>
                <SafeAreaView style={{ display: 'flex', gap: 20, flex: 1 }}>
                    <Card style={{ paddingHorizontal: 16, paddingVertical: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 8 }}>
                        <FontAwesome5 name='search' color='grey' size={18} />
                        <TextInput
                            cursorColor={COLORS.primary}
                            placeholder='Cari type/nama ruas jalan disini'
                            style={{ fontSize: 16, flex: 1 }}
                            value={search}
                            onChangeText={(value) => handleSearch(value)}
                        />
                    </Card>
                    <View style={{ flex: 1 }}>
                        {
                            !loading ? (
                                <FlatList
                                    data={search === '' ? dataRuas : filteredData}
                                    renderItem={({ item, index }) => (
                                        <CardInformasiJalan item={item} index={index} onClick={() => navigation.navigate('Detail', { id: item.no_ruas, type: type })} />
                                    )}
                                    ListEmptyComponent={() => (
                                        <EmptyList />
                                    )}
                                    initialNumToRender={10}
                                    extraData={item => item.no_ruas}
                                />
                            ) : (
                                <>
                                    <ShimmerCardInformasiJalan />
                                    <ShimmerCardInformasiJalan />
                                    <ShimmerCardInformasiJalan />
                                    <ShimmerCardInformasiJalan />
                                    <ShimmerCardInformasiJalan />
                                </>
                            )
                        }
                    </View>
                </SafeAreaView>
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