import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, TextInput, View } from 'react-native'
import Card, { CardInformasiJalan } from '../../components/Card'
import { COLORS } from '../../contains'
import { getRuasJalan } from '../../services'
import EmptyList from '../../components/EmptyList'
import { FontAwesome5 } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const Lingkungan = ({ navigation }) => {
    const [dataRuas, setDataRuas] = useState([])
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleSearch = (text) => {
        if (text) {
            const newData = dataRuas.filter(
                function (item) {
                    const itemData = item.ruas_jalan
                        ? item.ruas_jalan.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredData(newData);
            setSearch(text);
        } else {
            setFilteredData(dataRuas);
            setSearch(text);
        }
    };

    useEffect(() => {
        getRuasJalan('lingkungan')
            .then(data => {
                setDataRuas(data.data)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    return (
        <SafeAreaView style={{ display: 'flex', gap: 20, flex: 1 }}>
            <Card style={{ paddingHorizontal: 16, paddingVertical: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 8 }}>
                <FontAwesome5 name='search' color='grey' size={18} />
                <TextInput
                    cursorColor={COLORS.primary}
                    placeholder='Cari jalan disini'
                    style={{ fontSize: 16, flex: 1 }}
                    value={search}
                    onChangeText={(value) => handleSearch(value)}
                />
            </Card>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={search === '' ? dataRuas : filteredData}
                    renderItem={({ item, index }) => (
                        <CardInformasiJalan item={item} index={index} onClick={() => navigation.navigate('Detail', { id: item.no_ruas, nama: item.ruas_jalan, type: 'kota' })} />
                    )}
                    ListEmptyComponent={() => (
                        <EmptyList />
                    )}
                    extraData={item => item.no_ruas}
                />
            </View>
        </SafeAreaView>
    )
}

export default Lingkungan