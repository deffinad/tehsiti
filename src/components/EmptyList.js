import React from 'react'
import { Text, View } from 'react-native'

const EmptyList = () => {
    return (
        <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Data Tidak Ditemukan</Text>
        </View>
    )
}

export default EmptyList