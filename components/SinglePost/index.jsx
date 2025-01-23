import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View, ImageBackground } from 'react-native'

import { capitalizeText, formatRelativeTime, SinglePostStyle } from '../../style/style'

import { AllBrands } from '../../data';

const SinglePost = ({ post, setSingleBrand }) => {
    const navigation = useNavigation();
    const brand = AllBrands.find(brand => brand?.id == post?.brandId);

    const fn_selectBrand = () => {
        setSingleBrand(post?.brandId);
        navigation.navigate('Brands');
    }

    return (
        <View style={SinglePostStyle.main}>
            <TouchableOpacity style={SinglePostStyle.header} onPress={fn_selectBrand}>
                <View style={SinglePostStyle.headerImg}>
                    <Image source={brand?.img} style={{ width: "100%", height: "100%" }} />
                </View>
                <Text style={SinglePostStyle.headerText}>{capitalizeText(brand?.name)}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={SinglePostStyle.post} onPress={fn_selectBrand}>
                <ImageBackground source={post?.img} style={{ width: "100%", height: "100%" }} blurRadius={20}>
                    <Image source={post?.img} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </ImageBackground>
            </TouchableOpacity>
            <View style={SinglePostStyle.footer}>
                <Text style={SinglePostStyle.footerTime}>{formatRelativeTime(post?.date)}</Text>
            </View>
        </View>
    )
}

export default SinglePost