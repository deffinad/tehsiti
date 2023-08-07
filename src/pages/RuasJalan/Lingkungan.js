import React, { useEffect, useState } from 'react'
import { FlatList, Text, TextInput, View } from 'react-native'
import Card, { CardInformasiJalan } from '../../components/Card'
import { COLORS } from '../../contains'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { getRuasJalan } from '../../services'
import EmptyList from '../../components/EmptyList'

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
        <View style={{ paddingVertical: 24, display: 'flex', gap: 20, paddingBottom: 75 }}>
            <Card style={{ paddingHorizontal: 16, paddingVertical: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 8 }}>
                <FontAwesomeIcon icon={faSearch} color='grey' />
                <TextInput
                    cursorColor={COLORS.primary}
                    placeholder='Cari jalan disini'
                    style={{ fontSize: 16, flex: 1 }}
                    value={search}
                    onChangeText={(value) => handleSearch(value)}
                />
            </Card>
            <FlatList
                data={search === '' ? dataRuas : filteredData}
                renderItem={({ item, index }) => (
                    <CardInformasiJalan item={item} index={index} onClick={() => navigation.navigate('Detail', { id: item.no_ruas, nama: item.ruas_jalan, type: 'lingkungan' })} />
                )}
                ListEmptyComponent={() => (
                    <EmptyList />
                )}
                extraData={item => item.no_ruas}
            />
        </View>
    )
}

export default Lingkungan