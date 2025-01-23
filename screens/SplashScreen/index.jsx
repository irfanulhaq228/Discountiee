import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

import logo from "../../assets/D_logo_3.jpeg";

import { colors } from '../../style/style';

function SplashScreen() {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(scaleAnim, {
            toValue: 10,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [scaleAnim]);

    const SplashScreenStyle = StyleSheet.create({
        logoCircle: {
            height: 220,
            width: 220,
            backgroundColor: colors.mainColor,
            borderRadius: 200,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
        },
        animatedCircle: {
            transform: [{ scale: scaleAnim }],
        },
        logoImage: {
            width: 220,
            height: 220,
            objectFit: "cover",
            position: "absolute",
            borderRadius: 200
        }
    });

    return (
        <LinearGradient colors={[colors.white, colors.white]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "relative" }}>
            <Animated.View style={SplashScreenStyle.animatedCircle}>
                <Animated.View style={SplashScreenStyle.logoCircle}></Animated.View>
            </Animated.View>
            <Image source={logo} style={SplashScreenStyle.logoImage} />
        </LinearGradient>
    );
}

export default SplashScreen;
