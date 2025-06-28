import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { BrandPostListViewStyle, BrandsSignupStyle, colors } from "../../../style/style";

import logo from "../../../assets/D_logo_4.png";
import forgotPassword from "../../../assets/forgotPassword.png";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialDesignIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useToast } from "react-native-toast-notifications";
import { fn_sendOTPApi } from "../../../api/api";
import RoundLoader from "../../../components/RoundLoader";

const BrandsForgetPassword = ({ setResetEmail }) => {

    const toast = useToast();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [loader, setLoader] = useState(false);

    const fn_sendOTP = async () => {
        toast.hideAll();
        if (email === "") return toast.show("❗ Email is required");
        setLoader(true);
        const response = await fn_sendOTPApi({ email });
        if (response?.status) {
            setLoader(false);
            setResetEmail(email);
            toast.show(response?.message);
            navigation.navigate('BrandsOTP');
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
                            <Image source={forgotPassword} height={50} width={50} style={{ width: 200, height: 200, objectFit: 'contain', alignSelf: 'center', marginVertical: 15 }} />
                            <View style={BrandsSignupStyle.inputBoxMain}>
                                <Text style={BrandsSignupStyle.BrandLogoText}>Email Address</Text>
                                <TextInput
                                    value={email}
                                    placeholder='johndue@gmail.com'
                                    style={BrandsSignupStyle.textInput}
                                    placeholderTextColor={colors.lightMainColor}
                                    onChangeText={(value) => setEmail(value)}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={fn_sendOTP}
                                style={{ ...BrandsSignupStyle.button, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 5 }}
                            >
                                <MaterialDesignIcons name="message-processing-outline" size={17} style={{ color: colors.white, marginTop: 1 }} />
                                <Text style={{ color: colors.white, textAlign: "center", fontSize: 15, fontWeight: 600, width: 68 }}>
                                    Send OTP
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

export default BrandsForgetPassword;