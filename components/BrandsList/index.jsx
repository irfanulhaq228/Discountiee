import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BrandsListStyle, capitalizeText, colors, formatRelativeTime } from "../../style/style";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import { AllBrands, Categories } from "../../data";

const BrandsList = ({ selectedCategory, setSingleBrand }) => {
    const navigation = useNavigation();
    const allBrands = AllBrands.filter(brand => brand?.categoryId == selectedCategory);
    const category = Categories.find(category => category?.id == selectedCategory);
    return (
        <View style={{ gap: 5 }}>
            <View style={{ position: "relative", width: "100%", justifyContent: "center" }}>
                <Text style={BrandsListStyle.heading}>Brands List</Text>
                <Text style={{ position: "absolute", right: 0, fontWeight: 500, fontSize: 11, color: colors.darkGray }}>Selected Category: {capitalizeText(category?.name)}</Text>
            </View>
            <View style={{ gap: 5 }}>
                {allBrands?.length > 0 ? allBrands?.map((brand, index) => (
                    <SingleBrand key={index} brand={brand} navigation={navigation} setSingleBrand={setSingleBrand} index={index} />
                )) : (
                    <Text style={{ textAlign: "center", color: "red", fontWeight: 500, fontSize: 15, marginTop: 10 }}>No Brand Found</Text>
                )}
            </View>
        </View>
    )
}

export default BrandsList;

const SingleBrand = ({ brand, navigation, setSingleBrand, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(index * 100),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(translateYAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [fadeAnim, translateYAnim, index]);

    const fn_selectBrand = () => {
        setSingleBrand(brand?.id);
        navigation.navigate('Brands');
    };

    return (
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
            <TouchableOpacity activeOpacity={0.7} style={BrandsListStyle.singleBrand} onPress={fn_selectBrand}>
                <View style={BrandsListStyle.singleBrandImage}>
                    <Image source={brand?.img} style={{ height: "100%", width: "100%" }} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={BrandsListStyle.singleBrandText}>{brand?.name}</Text>
                    <View style={{ flexDirection: "row", gap: 5, marginTop: 5, flexDirection: "row" }}>
                        <FontAwesome6 name="location-dot" size={12} style={{ color: colors.mainColor, marginTop: -1 }} />
                        <Text style={BrandsListStyle.singleBrandLocation}>{brand?.location}</Text>
                    </View>
                </View>
                <Text style={BrandsListStyle.latestDiscountText}>Latest Discount: {formatRelativeTime(brand?.latestDiscount)}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}