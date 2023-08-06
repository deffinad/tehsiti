import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselImg1 from './../../assets/carousel1.jpg';
import CarouselImg2 from './../../assets/carousel2.jpg';
import CarouselImg3 from './../../assets/carousel3.jpg';
import CarouselImg4 from './../../assets/carousel4.jpg';
import { COLORS } from '../contains/index'
import Card, { CardInformasiItem, CardInformasiJalan } from '../component/Card';
import { useNavigation } from '@react-navigation/native';
import { faArchway, faCity, faEarthAsia, faRoad } from '@fortawesome/free-solid-svg-icons';
import { getRuasJalan } from '../services';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const dataCarousel = [
    CarouselImg1,
    CarouselImg2,
    CarouselImg3,
    CarouselImg4,
];

const dataInformasi = [
    {
        icon: faCity,
        label: 'Kota'
    },
    {
        icon: faArchway,
        label: 'Provinsi',
    },
    {
        icon: faEarthAsia,
        label: 'Nasional'
    },
    {
        icon: faRoad,
        label: 'Lingkungan'
    }
]

// const dataJalan = [
//     {
//         no_ruas: '22.05.0001',
//         ruas_jalan: 'Abdul Azis, KH.',
//         panjang: '0,600',
//         kapasitas: '-'
//     },
//     {
//         no_ruas: '22.05.0002',
//         ruas_jalan: 'Assalama',
//         panjang: '1,200',
//         kapasitas: '-'
//     },
//     {
//         no_ruas: '22.05.0003',
//         ruas_jalan: 'Ahmad Yani (2/1 UD)',
//         panjang: '1,240',
//         kapasitas: '2,140'
//     },
//     {
//         no_ruas: '22.05.0004',
//         ruas_jalan: 'Ahmad Yani (4/2 D)',
//         panjang: '1,240',
//         kapasitas: '5,645'
//     },
//     {
//         no_ruas: '22.05.0005',
//         ruas_jalan: 'Alun-Alun Utara',
//         panjang: '0,095',
//         kapasitas: '-'
//     },
// ]

const Home = () => {
    const [index, setIndex] = useState(0);
    const isCarousel = useRef(null);
    const navigation = useNavigation()
    const [dataRuas, setDataRuas] = useState([])

    useEffect(() => {
        getRuasJalan('kota')
            .then(data => {
                setDataRuas(data.data)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.header}>
                    <View style={styles.textHeader}>
                        <Text style={styles.textOne}>Hallo!</Text>
                        <Text style={styles.textTwo}>Selamat Datang di Aplikasi TEHSITI</Text>
                    </View>

                    <Image
                        source={require('./../../assets/logo.png')}
                        style={styles.imageHeader}
                    />
                </View>

                <View>
                    <Carousel
                        layout="default"
                        layoutCardOffset={9}
                        ref={isCarousel}
                        data={dataCarousel}
                        renderItem={CaroselItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        onSnapToItem={index => setIndex(index)}
                        useScrollView={true}
                    />

                    <Pagination
                        dotsLength={dataCarousel.length}
                        activeDotIndex={index}
                        carouselRef={isCarousel}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: -5,
                            // backgroundColor: Colors.primaryDark,
                        }}
                        dotColor={COLORS.secondary}
                        inactiveDotColor={COLORS.primary}
                        inactiveDotScale={0.6}
                        tappableDots={true} />
                </View>

                <View style={styles.header}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                        <View style={{ width: 4, backgroundColor: COLORS.secondary, borderRadius: 3 }} />
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>Informasi Jalan</Text>
                    </View>
                </View>

                <View style={{ marginHorizontal: 24 }}>
                    <FlatList
                        data={dataInformasi}
                        horizontal={true}
                        renderItem={({ item, index }) => <CardInformasiItem item={item} index={index} onClick={() => navigation.navigate('Detail', { id: item.no_ruas, nama: item.ruas_jalan, type: 'kota' })} />}
                        extraData={item => item.label}
                    />
                </View>

                <View style={styles.header}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                        <View style={{ width: 4, backgroundColor: COLORS.secondary, borderRadius: 3 }} />
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>Info Ruas</Text>
                    </View>

                    <Pressable onPress={() => navigation.navigate('RuasJalan')}>
                        <Text style={{ color: COLORS.primary }}>Lihat Semuanya</Text>
                    </Pressable>
                </View>

                <View style={{ marginHorizontal: 24 }}>
                    <FlatList
                        data={dataRuas.splice(0, 5)}
                        renderItem={({ item, index }) => (
                            <CardInformasiJalan item={item} index={index} />
                        )}
                        extraData={item => item.no_ruas}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const CaroselItem = ({ item, index }) => {
    return (
        <ImageBackground
            source={item}
            key={index}
            style={styles.imageCarousel}
            imageStyle={{ borderRadius: 20 }}
            resizeMode="cover">
            {/* <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
          <Text style={styles.title}>{item.title}</Text>
          {item.body != '' ? <Text style={styles.body}>{item.body}</Text> : null}
        </View> */}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    header: {
        paddingHorizontal: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textHeader: {
        flex: 1,
    },
    textOne: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    textTwo: {
        fontWeight: 'bold',
        fontSize: 18
    },
    imageHeader: {
        width: 70,
        height: 70
    },
    imageCarousel: {
        width: ITEM_WIDTH,
        height: 180,
        justifyContent: 'flex-start',
        // backgroundColor: Colors.primaryDark,
        borderRadius: 20,
        width: ITEM_WIDTH,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
    },
    title: {
        // color: Colors.primary,
        fontSize: 18,
        fontWeight: '700',
    },
});
export default Home