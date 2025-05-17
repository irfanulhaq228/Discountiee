import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { colors, RoundLoadeerStyle } from '../style/style'

const RoundLoader = () => {
    return (
        <View style={RoundLoadeerStyle.main}>
            <Text style={RoundLoadeerStyle.sec}>
                <ActivityIndicator size="large" color={colors.mainColor || '#000'} style={{ width: "100%", height: "100%" }} />
            </Text>
        </View>
    )
}

export default RoundLoader