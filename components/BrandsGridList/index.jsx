import React from 'react'
import { Image, View } from 'react-native'
import { BrandsHomeListStyle } from '../../style/style'

import { API_URL } from '@env';

const BrandsGridList = ({ data }) => {
    return (
        <View style={BrandsHomeListStyle.gridMain}>
            {data?.map((item, index) => (
                <View style={BrandsHomeListStyle.gridSingleBox} key={index}>
                    <Image source={{ uri: `${API_URL}/${item?.images?.[0]}` }} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </View>
            ))}
        </View>
    )
}

export default BrandsGridList