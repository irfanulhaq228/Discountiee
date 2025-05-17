import React, { useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Animated, Easing, TouchableOpacity } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { BottomBarStyle, colors } from "../../style/style";

const BrandsBottomBar = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.15,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.9,
                    duration: 700,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={BottomBarStyle.main}>
            <View style={BottomBarStyle.sec}>
                <View style={BottomBarStyle.gradient}>
                    <TouchableOpacity onPress={() => navigation.navigate('BrandsHome')}>
                        <Ionicons
                            name="list-outline"
                            style={route.name === 'BrandsHome' ? BottomBarStyle.activeIcon : BottomBarStyle.icon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...BottomBarStyle.brandsProductAddIconBox, borderColor: route.name === 'BrandsDiscountAdd' ? "#563392" : "#fff" }} onPress={() => navigation.navigate('BrandsDiscountAdd')}>
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <FontAwesome5 name="plus" style={BottomBarStyle.brandsProductAddIcon} />
                        </Animated.View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('BrandsSetting')}>
                        <Ionicons
                            name="settings-outline"
                            style={route.name === 'BrandsSetting' ? BottomBarStyle.activeIcon : BottomBarStyle.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default BrandsBottomBar;
