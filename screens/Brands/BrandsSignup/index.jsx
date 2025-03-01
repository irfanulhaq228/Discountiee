import React, { useCallback, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import logo from "../../../assets/D_logo_4.png";
import { BrandsSignupStyle, colors } from '../../../style/style';

const BrandsSignUp = ({ mode, setMode }) => {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);

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

    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("Image picker error: ", response.error);
            } else if (response.assets && response.assets.length > 0) {
                setSelectedImage(response.assets[0].uri);
            }
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={BrandsSignupStyle.main} contentContainerStyle={{ minHeight: "100%" }}>
                <View style={BrandsSignupStyle.sec}>
                    <View style={BrandsSignupStyle.logoView}>
                        <Image source={logo} height={200} resizeMode="contain" style={{ width: 200, height: 80 }} />
                    </View>
                    <View style={{ width: "100%", gap: 20 }}>
                        <TouchableOpacity onPress={selectImage} style={BrandsSignupStyle.uploadLogoView}>
                            {selectedImage ? (
                                <Image source={{ uri: selectedImage }} style={BrandsSignupStyle.uploadLogoCircle} />
                            ) : (
                                <View style={BrandsSignupStyle.uploadLogoCircle}>
                                    <FontAwesome style={{ textAlign: "center", fontSize: 35, color: colors.darkGray }} name="image" />
                                </View>
                            )}
                        </TouchableOpacity>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Brand Name</Text>
                            <TextInput placeholder='Enter Brand Name' placeholderTextColor={colors.darkGray} style={BrandsSignupStyle.textInput} />
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Location</Text>
                            <TextInput placeholder='Enter Location' placeholderTextColor={colors.darkGray} style={BrandsSignupStyle.textInput} />
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Email Address</Text>
                            <TextInput placeholder='Enter Email Address' placeholderTextColor={colors.darkGray} style={BrandsSignupStyle.textInput} />
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Password</Text>
                            <TextInput placeholder='Enter Password' placeholderTextColor={colors.darkGray} style={BrandsSignupStyle.textInput} />
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={BrandsSignupStyle.button}>
                            <Text style={{ color: colors.white, textAlign: "center", fontSize: 18, fontWeight: "600" }}>Submit</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: -10, flexDirection: "row" }}>
                            <Text style={{ fontSize: 15 }}>Already Have An Account? </Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("BrandsSignIn")}>
                                <Text style={{ fontSize: 15, textDecorationLine: "underline", fontWeight: "600", color: "blue" }}>
                                    Login Here
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5 }}>
                            <View style={{ flex: 1, borderColor: colors.gray, borderWidth: 1 }}></View>
                            <View style={{ width: 15 }}><Text style={{ textAlign: "center" }}>or</Text></View>
                            <View style={{ flex: 1, borderColor: colors.gray, borderWidth: 1 }}></View>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={BrandsSignupStyle.button} onPress={fn_switchMode}>
                            <Text style={{ color: colors.white, textAlign: "center", fontSize: 18, fontWeight: "600" }}>Switch to User Mode</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default BrandsSignUp;