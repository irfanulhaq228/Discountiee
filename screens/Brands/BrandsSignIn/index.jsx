import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import logo from "../../../assets/D_logo_4.png";
import { BrandsSignupStyle, colors } from '../../../style/style';
import { fn_loginBrandApi } from '../../../api/api';

const BrandsSignIn = ({ setIsAuthenticated }) => {
    const toast = useToast();
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                        <Image source={logo} height={200} resizeMode="contain" style={{ width: 200, height: 80 }} />
                    </View>
                    <View style={{ width: "100%", gap: 20 }}>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Email Address</Text>
                            <TextInput
                                value={email}
                                placeholder='Enter Email Address'
                                style={BrandsSignupStyle.textInput}
                                placeholderTextColor={colors.darkGray}
                                onChangeText={(value) => setEmail(value)}
                            />
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Password</Text>
                            <TextInput
                                value={password}
                                placeholder='Enter Password'
                                style={BrandsSignupStyle.textInput}
                                placeholderTextColor={colors.darkGray}
                                onChangeText={(value) => setPassword(value)}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={BrandsSignupStyle.button} onPress={handleSubmit}>
                            <Text style={{ color: colors.white, textAlign: "center", fontSize: 18, fontWeight: 600 }}>Submit</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: -10, flexDirection: "row" }}>
                            <Text style={{ fontSize: 15 }}>Don't Have An Account? </Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("BrandsSignUp")}>
                                <Text style={{ fontSize: 14, textDecorationLine: "underline", fontWeight: "600", color: colors.mainColor, fontStyle: "italic" }}>
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

export default BrandsSignIn