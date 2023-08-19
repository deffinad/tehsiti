import React from 'react'
import Card from './Card';
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'react-native';

export const ShimmerCardInformasiJalan = () => {
    const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient)

    return (
        <Card style={{ display: 'flex', gap: 5, margin: 5, padding: 16, alignItems: 'flex-start' }}>
            <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} />
            <ShimmerPlaceHolder style={{ borderRadius: 4 }} />
            <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={80} />

            <View style={{ display: 'flex', flexDirection: 'row', gap: 4, marginTop: 8 }}>
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={120} />
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={120} />
            </View>
        </Card>
    );
};