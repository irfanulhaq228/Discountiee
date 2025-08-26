import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import { fn_loginBrandApi } from '../../../api/api';

import login from "../../../assets/login.png";
import logo from "../../../assets/D_logo_4.png";
import { BrandPostListViewStyle, BrandsSignupStyle, colors } from '../../../style/style';

const BrandsSignIn = ({ setIsAuthenticated }) => {
    const toast = useToast();
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const validateForm = () => {
        if (email === "") {
            toast.show("❗ Email Address is required");
            return false;
        }
        if (password === "") {
            toast.show("❗ Password is required");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        toast.hideAll();
        if (validateForm()) {
            const obj = { email, password };
            const response = await fn_loginBrandApi(obj);
            console.log("res ", response);
            if (response?.status) {
                console.log("res ", response);
                setIsAuthenticated(true);
                await AsyncStorage.setItem('id', response.data._id.toString());
                toast.show("✅ Brand Login Successfully");
                navigation.navigate('BrandsHome');
            } else {
                toast.show(`❌ ${response?.message}`);
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={BrandsSignupStyle.main} contentContainerStyle={{ minHeight: "100%" }}>
                <View style={BrandsSignupStyle.sec}>
                    <View style={BrandsSignupStyle.logoView}>
                        <Image source={logo} height={200} resizeMode="contain" style={{ width: 220, height: 80 }} />
                    </View>
                    <View style={{ width: "100%", gap: 10, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.lightMainColor, borderRadius: 15, padding: 15, boxShadow: '-2px 2px 10px rgba(0,0,0,0.1) inset, 2px -2px 10px rgba(0,0,0,0.1) inset' }}>
                        <Image source={login} height={50} width={50} style={{ width: 250, height: 250, objectFit: 'contain', alignSelf: 'center', marginVertical: 15 }} />
                        <View style={{ ...BrandsSignupStyle.inputBoxMain, marginTop: -15 }}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Email Address</Text>
                            <TextInput
                                value={email}
                                placeholder='johndue@gmail.com'
                                style={BrandsSignupStyle.textInput}
                                placeholderTextColor={colors.lightMainColor}
                                onChangeText={(value) => setEmail(value)}
                            />
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Password</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    textContentType={passwordVisible ? 'password' : 'none'}
                                    value={password}
                                    placeholder='*******'
                                    style={[BrandsSignupStyle.textInput, { paddingRight: 50 }]}
                                    placeholderTextColor={colors.lightMainColor}
                                    onChangeText={(value) => setPassword(value)}
                                    secureTextEntry={!passwordVisible}
                                />
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        right: 15,
                                        top: 0,
                                        bottom: 0,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: 999
                                    }}
                                    onPress={() => setPasswordVisible(!passwordVisible)}
                                >
                                    <Feather
                                        name={passwordVisible ? 'eye' : 'eye-off'}
                                        size={17}
                                        color={colors.mainColor}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={{ ...BrandsSignupStyle.button, marginTop: 5 }} onPress={handleSubmit}>
                            <Text style={{ color: colors.white, textAlign: "center", fontSize: 16, fontWeight: 600 }}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 2 }} onPress={() => navigation.navigate('BrandsForgetPassword')}>
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '500', textDecorationLine: 'underline', color: colors.mainColor }}>Forgot Password ?</Text>
                        </TouchableOpacity>
                        <View style={{ ...BrandPostListViewStyle.seperator }}></View>
                        <View style={{ marginTop: -5, flexDirection: "row" }}>
                            <Text style={{ fontSize: 14, color: colors.darkGray, fontWeight: '500' }}>Don't Have An Account? </Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("BrandsSignUp")}>
                                <Text style={{ fontSize: 15, textDecorationLine: "underline", fontWeight: "600", color: colors.mainColor, fontStyle: "italic" }}>
                                    Signup Here
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default BrandsSignIn;