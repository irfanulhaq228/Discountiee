import React, { useCallback } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import logo from "../../../assets/D_logo_4.png";
import { BrandsSignupStyle, colors } from '../../../style/style';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const BrandsSignIn = ({ mode, setMode }) => {

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            if (mode === "user") {
                navigation.navigate('Home');
            }
        }, [navigation, mode])
    );

    const fn_switchMode = () => {
        setMode("user");
        navigation.navigate("Home");
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={BrandsSignupStyle.main} contentContainerStyle={{ minHeight: "100%" }}>
                <View style={BrandsSignupStyle.sec}>
                    <View style={BrandsSignupStyle.logoView}>
                        <Image source={logo} height={200} resizeMode="contain" style={{ width: 200, height: 80 }} />
                    </View>
                    <View style={{ width: "100%", gap: 20 }}>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Email Address</Text>
                            <TextInput placeholder='Enter Email Address' placeholderTextColor={colors.darkGray} style={BrandsSignupStyle.textInput} />
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Password</Text>
                            <TextInput placeholder='Enter Password' placeholderTextColor={colors.darkGray} style={BrandsSignupStyle.textInput} />
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={BrandsSignupStyle.button} onPress={() => navigation.navigate("BrandsHome")}>
                            <Text style={{ color: colors.white, textAlign: "center", fontSize: 18, fontWeight: 600 }}>Submit</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: -10, flexDirection: "row" }}>
                            <Text style={{ fontSize: 15 }}>Don't Have An Account? </Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("BrandsSignUp")}>
                                <Text style={{ fontSize: 15, textDecorationLine: "underline", fontWeight: "600", color: "blue" }}>
                                    Signup Here
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5 }}>
                            <View style={{ flex: 1, borderColor: colors.gray, borderWidth: 1 }}></View>
                            <View style={{ width: 15 }}><Text style={{ textAlign: "center" }}>or</Text></View>
                            <View style={{ flex: 1, borderColor: colors.gray, borderWidth: 1 }}></View>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={BrandsSignupStyle.button} onPress={fn_switchMode}>
                            <Text style={{ color: colors.white, textAlign: "center", fontSize: 18, fontWeight: 600 }}>Switch to User Mode</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default BrandsSignIn