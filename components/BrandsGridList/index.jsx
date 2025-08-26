import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity, View } from 'react-native'

// import { API_URL } from '@env';
import { API_URL } from '../../api/api';
import { BrandsHomeListStyle } from '../../style/style'

const BrandsGridList = ({ data }) => {
    const navigation = useNavigation();
    return (
        <View style={BrandsHomeListStyle.gridMain}>
            {data?.map((item, index) => (
                <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('SingleDiscountDetails', { discountId: item._id })} style={BrandsHomeListStyle.gridSingleBox} key={index}>
                    <Image source={{ uri: `${API_URL}/${item?.images?.[0]}` }} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default BrandsGridList