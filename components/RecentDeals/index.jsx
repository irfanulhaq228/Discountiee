import React from 'react'
import { Text, View } from 'react-native'
import { HomeStyle } from '../../style/style'

import SinglePost from '../SinglePost'

import { RecentDiscounts } from '../../data';

const RecentDeals = ({ setSingleBrand }) => {
    return (
        <View style={{ gap: 5 }}>
            <Text style={HomeStyle.categoriesListHeading}>Recent Deals</Text>
            <View style={{ gap: 5 }}>
                {RecentDiscounts?.map((post, index) => <SinglePost key={index} post={post} setSingleBrand={setSingleBrand} />)}
            </View>
        </View>
    )
}

export default RecentDeals;