import React from 'react'
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, Text, View } from 'react-native'
import { COLORS } from '../../contains'

const ShimmerDetail = () => {
    const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient)
    return (
        <View style={{ paddingHorizontal: 24, paddingBottom: 24, display: 'flex', gap: 24 }}>
            <View style={{ display: 'flex', gap: 8 }}>
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={250} height={40} />
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} />
                <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} />
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                <View style={{ width: 4, backgroundColor: COLORS.secondary, borderRadius: 3 }} />
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Sumber</Text>
            </View>

            <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={Dimensions.get('window').width - 50} height={50} />

            <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                <View style={{ width: 4, backgroundColor: COLORS.secondary, borderRadius: 3 }} />
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Data</Text>
            </View>

            <View style={{ display: 'flex', gap: 8 }}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} />
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} />
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} />
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} />
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={100} />
                    <ShimmerPlaceHolder style={{ borderRadius: 4 }} />
                </View>
            </View>

            <ShimmerPlaceHolder style={{ borderRadius: 4 }} width={Dimensions.get('window').width - 50} height={40} />

        </View>
    )
}

export default ShimmerDetail