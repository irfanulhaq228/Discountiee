import React from 'react'
import { Text, View } from 'react-native'
import { HomeStyle } from '../../style/style'
import SinglePost from '../SinglePost'

const TopDeals = () => {
    return (
        <View style={{ gap: 5 }}>
            <Text style={HomeStyle.categoriesListHeading}>Top Deals</Text>
            <View style={{ gap: 5 }}>
                <SinglePost />
                <SinglePost />
                <SinglePost />
            </View>
        </View>
    )
}

export default TopDeals;