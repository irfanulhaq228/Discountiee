import React, { useEffect } from 'react';
import { View, ScrollView, Text, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import { AllBrands, Discounts } from '../../data';
import { capitalizeText, formatRelativeTime, SingleBrandStyle, SinglePostStyle, Variables } from '../../style/style';

import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottomBar';

function SingleBrandScreen({ singleBrand, setSingleBrand }) {

    const navigation = useNavigation();
    const brand = AllBrands.find((brand) => brand.id === singleBrand);
    const discounts = Discounts.filter((discount) => discount?.brandId === singleBrand);

    useEffect(() => {
        if (!singleBrand) {
            navigation.navigate('Home')
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Brand Information"} />
            <ScrollView style={SingleBrandStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={SingleBrandStyle.bgDesign}></View>
                <View style={SingleBrandStyle.sec}>
                    <View style={SingleBrandStyle.profileImage}>
                        <Image source={brand?.img} style={{ width: "100%", height: "100%" }} />
                    </View>
                    <Text style={SingleBrandStyle.brandName}>{capitalizeText(brand?.name)}</Text>
                    <View>
                        <FontAwesome6 name="location-dot" style={SingleBrandStyle.locationIcon} size={18} />
                        <Text style={SingleBrandStyle.locationText}>{brand?.location}</Text>
                    </View>
                    <Text style={SingleBrandStyle.mapViewText}>View on Map</Text>
                    <View style={SingleBrandStyle.seperator}></View>
                    <View style={{ gap: 5, width: "100%" }}>
                        {discounts?.length > 0 ? discounts?.map((discount) => (
                            <SinglePost key={discount?.id} discount={discount} />
                        )) : (
                            <Text style={{ color: "red", textAlign: "center", fontWeight: "500", fontSize: 16 }}>
                                <FontAwesome5 name="exclamation-circle" size={19} />
                                &nbsp;
                                No Discount Found
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>
            <BottomBar setSingleBrand={setSingleBrand} />
        </View>
    );
}

export default SingleBrandScreen;

const SinglePost = ({ discount }) => {
    return (
        <View style={SinglePostStyle.main}>
            <View style={{ backgroundColor: "black", height: 150, borderRadius: 7, overflow: "hidden" }}>
                <ImageBackground source={discount?.img} style={{ width: "100%", height: "100%" }} blurRadius={20}>
                    <Image source={discount?.img} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </ImageBackground>
            </View>
            <View style={SinglePostStyle.footer}>
                <Text style={SinglePostStyle.footerTime}>{formatRelativeTime(discount?.date)}</Text>
            </View>
        </View>
    )
}

