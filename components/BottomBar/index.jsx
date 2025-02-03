import React, { useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Animated, Dimensions, BackHandler } from 'react-native';

import BrandsDrawer from '../BrandsDrawer';
import { BottomBarStyle, colors } from '../../style/style';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function BottomBar({ mode, setSingleBrand }) {

    const route = useRoute();
    const navigation = useNavigation();
    const [brandsDrawer, setBrandsDrawer] = useState(false);
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    const openDrawer = () => {
        setBrandsDrawer(true);
        Animated.timing(translateY, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start();
    };

    const closeDrawer = () => {
        Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setBrandsDrawer(false));
    };

    return (
        <>
            {mode === "user" && (
                <View style={BottomBarStyle.main}>
                    <View style={BottomBarStyle.sec}>
                        <LinearGradient
                            colors={[colors.mainColor, colors.secColor]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={BottomBarStyle.gradient}
                        >
                            <TouchableOpacity onPress={openDrawer}>
                                <MaterialCommunityIcons
                                    name="shopping-search"
                                    style={route.name === 'Brands' ? BottomBarStyle.activeIcon : BottomBarStyle.icon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Icon
                                    name="home"
                                    style={route.name === 'Home' ? BottomBarStyle.activeIcon : BottomBarStyle.icon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
                                <MaterialIcons
                                    name="category"
                                    style={route.name === 'Categories' ? BottomBarStyle.activeIcon : BottomBarStyle.icon}
                                />
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    <BrandsDrawer
                        brandsDrawer={brandsDrawer}
                        closeDrawer={closeDrawer}
                        translateY={translateY}
                        setSingleBrand={setSingleBrand}
                    />
                </View>
            )}
        </>
    );
}

export default BottomBar;
