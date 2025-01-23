import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Animated, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import Entypo from "react-native-vector-icons/Entypo";

import { BrandsDrawerStyle, capitalizeText, colors, formatRelativeTime } from '../../style/style';

import { AllBrands } from '../../data';

const BrandsDrawer = ({ brandsDrawer, closeDrawer, translateY, setSingleBrand }) => {

    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');

    const filteredBrands = AllBrands?.filter(brand =>
        brand?.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Modal transparent visible={brandsDrawer} animationType="none">
            <TouchableWithoutFeedback onPress={closeDrawer}>
                <View style={BrandsDrawerStyle.overlay}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                BrandsDrawerStyle.drawerContainer,
                                { transform: [{ translateY }] },
                            ]}
                        >
                            <View style={BrandsDrawerStyle.drawerContent}>
                                <TouchableWithoutFeedback activeOpacity={0.9} onPress={closeDrawer}>
                                    <Entypo name="cross" style={{ position: "absolute", right: -10, top: -50, color: colors.white }} size={40} />
                                </TouchableWithoutFeedback>
                                <View style={BrandsDrawerStyle.heading}>
                                    <Text style={BrandsDrawerStyle.headingText}>Brands List</Text>
                                </View>
                                <View style={{ position: "relative", width: "100%" }}>
                                    <TextInput
                                        style={BrandsDrawerStyle.searchBox}
                                        placeholder="Search Brand..."
                                        placeholderTextColor={"gray"}
                                        value={searchText}
                                        onChangeText={setSearchText}
                                        autoCapitalize="none"
                                    />
                                    <Icon name="search" style={BrandsDrawerStyle.searchIcon} size={14} />
                                </View>
                                <ScrollView style={BrandsDrawerStyle.brandsList}>
                                    <TouchableOpacity style={{ gap: 5 }} activeOpacity={1}>
                                        {filteredBrands?.length > 0 ? filteredBrands?.map((brand, index) => (
                                            <SingleBrand
                                                key={index}
                                                navigation={navigation}
                                                closeDrawer={closeDrawer}
                                                brand={brand}
                                                setSingleBrand={setSingleBrand}
                                            />
                                        )) : (
                                            <Text style={{ textAlign: "center", marginTop: 5, fontSize: 15, fontWeight: 600, color: "red" }}>No Brands Found</Text>
                                        )}
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const SingleBrand = ({ navigation, closeDrawer, brand, setSingleBrand }) => {
    const fn_selectBrand = () => {
        setSingleBrand(brand?.id)
        closeDrawer();
        navigation.navigate('Brands')
    }
    return (
        <TouchableOpacity activeOpacity={0.7} style={BrandsDrawerStyle.singleBrand} onPress={fn_selectBrand}>
            <View style={BrandsDrawerStyle.brandImage}>
                <Image source={brand?.img} style={{ width: "100%", height: "100%" }} />
            </View>
            <Text style={BrandsDrawerStyle.brandName}>{capitalizeText(brand?.name)}</Text>
            <Text style={BrandsDrawerStyle.latestPostText}>Latest Discount: {formatRelativeTime(brand?.latestDiscount)}</Text>
        </TouchableOpacity>
    )
}

export default BrandsDrawer;