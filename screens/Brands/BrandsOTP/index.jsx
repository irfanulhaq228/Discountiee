import { useState } from "react";
import { OtpInput } from "react-native-otp-entry";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { BrandPostListViewStyle, BrandsSignupStyle, colors } from "../../../style/style";

import otp from "../../../assets/otp.png";
import logo from "../../../assets/D_logo_4.png";
import { fn_verifyOTPApi } from "../../../api/api";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RoundLoader from "../../../components/RoundLoader";

const BrandsOTP = ({ resetEmail }) => {

    const toast = useToast();
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const [otpInput, setOtpInput] = useState('');

    const fn_verifyOTP = async () => {
        toast.hideAll();
        if (otpInput === "" || otpInput.length !== 4) {
            return toast.show("❗ Enter Correct OTP");
        }
        setLoader(true);
        const response = await fn_verifyOTPApi({ otp: otpInput, email: resetEmail });
        if (response?.status) {
            setLoader(false);
            toast.show(response?.message);
            navigation.navigate('BrandsResetPassword');
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
                            <Image source={otp} height={50} width={50} style={{ width: 220, height: 220, objectFit: 'contain', alignSelf: 'center', marginVertical: 15 }} />
                            <View style={{ ...BrandsSignupStyle.inputBoxMain, marginTop: -20 }}>
                                <Text style={{ ...BrandsSignupStyle.BrandLogoText, textAlign: 'center' }}>Enter OTP</Text>
                                <OtpInput
                                    numberOfDigits={4}
                                    focusColor={colors.mainColor}
                                    autoFocus={false}
                                    hideStick={true}
                                    placeholder=""
                                    blurOnFilled={true}
                                    disabled={false}
                                    type="numeric"
                                    secureTextEntry={false}
                                    focusStickBlinkingDuration={500}
                                    onFocus={() => console.log("Focused")}
                                    onBlur={() => console.log("Blurred")}
                                    onTextChange={(text) => console.log(text)}
                                    onFilled={(text) => setOtpInput(text)}
                                    textInputProps={{
                                        accessibilityLabel: "One-Time Password",
                                    }}
                                    textProps={{
                                        accessibilityRole: "text",
                                        accessibilityLabel: "OTP digit",
                                        allowFontScaling: false,
                                    }}
                                    theme={{
                                        containerStyle: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginVertical: 15 },
                                        pinCodeContainerStyle: { width: 50, height: 50, justifyContent: 'center' },
                                        pinCodeTextStyle: { fontSize: 22, fontWeight: '600' },
                                    }}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={fn_verifyOTP}
                                style={{ ...BrandsSignupStyle.button, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }}
                            >
                                <MaterialIcons name="lock-reset" size={25} style={{ color: colors.white, marginTop: 1 }} />
                                <Text style={{ color: colors.white, textAlign: "center", fontSize: 15, fontWeight: 600, width: '111' }}>
                                    Reset Password
                                </Text>
                            </TouchableOpacity>
                            <View style={{ ...BrandPostListViewStyle.seperator }}></View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('BrandsForgetPassword')}
                                style={{ ...BrandsSignupStyle.button, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                            >
                                <FontAwesome6 name="backward-step" size={18} style={{ color: colors.white, marginTop: 1 }} />
                                <Text style={{ color: colors.white, textAlign: "center", fontSize: 15, fontWeight: 600 }}>
                                    Change Email
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default BrandsOTP;