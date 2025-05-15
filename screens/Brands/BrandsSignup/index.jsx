import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import logo from "../../../assets/D_logo_4.png";
import { fn_createBrandApi } from '../../../api/api';
import { BrandsSignupStyle, colors } from '../../../style/style';

const BrandsSignUp = ({ setIsAuthenticated }) => {
    const toast = useToast();
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({ brandName: '', email: '', phone: '', address: '', city: '', country: '', password: '' });

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

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const validateForm = () => {
        if (!formData.brandName) {
            toast.show("❗ Brand Name is required");
            return false;
        }
        if (!formData.email) {
            toast.show("❗ Email Address is required");
            return false;
        }
        if (!formData.phone) {
            toast.show("❗ Phone Number is required");
            return false;
        }
        if (!formData.address) {
            toast.show("❗ Address is required");
            return false;
        }
        if (!formData.city) {
            toast.show("❗ City is required");
            return false;
        }
        if (!formData.country) {
            toast.show("❗ Country is required");
            return false;
        }
        if (!formData.password) {
            toast.show("❗ Password is required");
            return false;
        }
        if (!selectedImage) {
            toast.show("❗ Brand logo is required");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        toast.hideAll();
        if (validateForm()) {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.brandName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('city', formData.city);
            formDataToSend.append('country', formData.country);
            formDataToSend.append('password', formData.password);

            if (selectedImage) {
                formDataToSend.append('logo', {
                    uri: selectedImage,
                    type: 'image/jpeg',
                    name: 'brand_logo.jpg',
                });
            }

            const response = await fn_createBrandApi(formDataToSend);
            console.log("res", response);
            if (response?.status) {
                setIsAuthenticated(true);
                await AsyncStorage.setItem('id', response.data._id.toString());
                toast.show("✅ Brand Registered Successfully");
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
                        <TouchableOpacity onPress={selectImage} style={BrandsSignupStyle.uploadLogoView}>
                            {selectedImage ? (
                                <Image source={{ uri: selectedImage }} style={BrandsSignupStyle.uploadLogoCircle} />
                            ) : (
                                <View style={BrandsSignupStyle.uploadLogoCircle}>
                                    <FontAwesome style={{ textAlign: "center", fontSize: 35, color: colors.darkGray }} name="image" />
                                </View>
                            )}
                        </TouchableOpacity>
                        {errors.image && <Text style={{ color: 'red' }}>{errors.image}</Text>}
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Brand Name</Text>
                            <TextInput
                                placeholder='Enter Brand Name'
                                placeholderTextColor={colors.normalGray}
                                style={BrandsSignupStyle.textInput}
                                value={formData.brandName}
                                onChangeText={(value) => handleInputChange('brandName', value)}
                            />
                            {errors.brandName && <Text style={{ color: 'red' }}>{errors.brandName}</Text>}
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Email Address</Text>
                            <TextInput
                                placeholder='Enter Email Address'
                                placeholderTextColor={colors.normalGray}
                                style={BrandsSignupStyle.textInput}
                                value={formData.email}
                                onChangeText={(value) => handleInputChange('email', value)}
                            />
                            {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Phone Number</Text>
                            <TextInput
                                placeholder='Enter Phone Number'
                                placeholderTextColor={colors.normalGray}
                                style={BrandsSignupStyle.textInput}
                                value={formData.phone}
                                onChangeText={(value) => handleInputChange('phone', value)}
                            />
                            {errors.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Address</Text>
                            <TextInput
                                placeholder='Enter Address'
                                placeholderTextColor={colors.normalGray}
                                style={BrandsSignupStyle.textInput}
                                value={formData.address}
                                onChangeText={(value) => handleInputChange('address', value)}
                            />
                            {errors.address && <Text style={{ color: 'red' }}>{errors.address}</Text>}
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>City</Text>
                            <TextInput
                                placeholder='Enter City'
                                placeholderTextColor={colors.normalGray}
                                style={BrandsSignupStyle.textInput}
                                value={formData.city}
                                onChangeText={(value) => handleInputChange('city', value)}
                            />
                            {errors.city && <Text style={{ color: 'red' }}>{errors.city}</Text>}
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Country</Text>
                            <TextInput
                                placeholder='Enter Country'
                                placeholderTextColor={colors.normalGray}
                                style={BrandsSignupStyle.textInput}
                                value={formData.country}
                                onChangeText={(value) => handleInputChange('country', value)}
                            />
                            {errors.country && <Text style={{ color: 'red' }}>{errors.country}</Text>}
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Password</Text>
                            <TextInput
                                placeholder='Enter Password'
                                placeholderTextColor={colors.normalGray}
                                style={BrandsSignupStyle.textInput}
                                value={formData.password}
                                onChangeText={(value) => handleInputChange('password', value)}
                            />
                            {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={BrandsSignupStyle.button} onPress={handleSubmit}>
                            <Text style={{ color: colors.white, textAlign: "center", fontSize: 18, fontWeight: "600" }}>Submit</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: -10, flexDirection: "row" }}>
                            <Text style={{ fontSize: 14, color: colors.darkGray, fontStyle: "italic" }}>Already Have An Account? </Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("BrandsSignIn")}>
                                <Text style={{ fontSize: 14, textDecorationLine: "underline", fontWeight: "600", color: colors.mainColor, fontStyle: "italic" }}>
                                    Login Here
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

export default BrandsSignUp;