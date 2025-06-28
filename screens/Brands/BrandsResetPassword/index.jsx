import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { BrandPostListViewStyle, BrandsSignupStyle, colors } from "../../../style/style";

import logo from "../../../assets/D_logo_4.png";
import password from "../../../assets/password.png";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { fn_ResetPasswordApi } from "../../../api/api";
import RoundLoader from "../../../components/RoundLoader";

const BrandsResetPassword = ({ resetEmail }) => {

    const toast = useToast();
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const fn_ResetPassword = async () => {
        toast.hideAll();
        if (passwordInput === '' || confirmPassword === '') {
            return toast.show("❗ Fill all Fields");
        };
        console.log(passwordInput, confirmPassword)
        if (passwordInput !== confirmPassword) {
            return toast.show("❗ Both Passwords fields must be equal");
        };
        setLoader(true);
        const response = await fn_ResetPasswordApi({ email: resetEmail, password: passwordInput });
        if (response?.status) {
            setLoader(false);
            toast.show(response?.message);
            navigation.navigate('BrandsSignIn');
        } else {
            setLoader(false);
            toast.show(response?.message);
        }
    }

    return (
        <>
            {loader && <RoundLoader />}
            <View style={{ flex: 1 }}>
                <ScrollView style={BrandsSignupStyle.main} contentContainerStyle={{ minHeight: "100%" }}>
                    <View style={BrandsSignupStyle.sec}>
                        <View style={BrandsSignupStyle.logoView}>
                            <Image source={logo} height={200} resizeMode="contain" style={{ width: 220, height: 80 }} />
                        </View>
                        <View
                            style={{
                                width: "100%",
                                gap: 10,
                                backgroundColor: colors.white,
                                borderWidth: 1,
                                borderColor: colors.lightMainColor,
                                borderRadius: 15,
                                padding: 15,
                                boxShadow: '-2px 2px 10px rgba(0,0,0,0.1) inset, 2px -2px 10px rgba(0,0,0,0.1) inset'
                            }}
                        >
                            <Image source={password} height={50} width={50} style={{ width: 220, height: 220, objectFit: 'contain', alignSelf: 'center', marginVertical: 15 }} />
                            <View style={{ ...BrandsSignupStyle.inputBoxMain, marginTop: -15 }}>
                                <Text style={BrandsSignupStyle.BrandLogoText}>New Password</Text>
                                <TextInput
                                    placeholder='******'
                                    value={passwordInput}
                                    style={BrandsSignupStyle.textInput}
                                    placeholderTextColor={colors.lightMainColor}
                                    onChangeText={(text) => setPasswordInput(text)}
                                />
                            </View>
                            <View style={BrandsSignupStyle.inputBoxMain}>
                                <Text style={BrandsSignupStyle.BrandLogoText}>Confirm New Password</Text>
                                <TextInput
                                    placeholder='******'
                                    value={confirmPassword}
                                    style={BrandsSignupStyle.textInput}
                                    placeholderTextColor={colors.lightMainColor}
                                    onChangeText={(text) => setConfirmPassword(text)}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={fn_ResetPassword}
                                style={{ ...BrandsSignupStyle.button, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 5 }}
                            >
                                <MaterialIcons name="password" size={22} style={{ color: colors.white, marginTop: 1 }} />
                                <Text style={{ color: colors.white, textAlign: "center", fontSize: 15, fontWeight: 600, width: '121' }}>
                                    Update Password
                                </Text>
                            </TouchableOpacity>
                            <View style={{ ...BrandPostListViewStyle.seperator }}></View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('BrandsSignIn')}
                                style={{ ...BrandsSignupStyle.button, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                            >
                                <FontAwesome6 name="backward-step" size={18} style={{ color: colors.white, marginTop: 1 }} />
                                <Text style={{ color: colors.white, textAlign: "center", fontSize: 15, fontWeight: 600 }}>
                                    Back to Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default BrandsResetPassword;