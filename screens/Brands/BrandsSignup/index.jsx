import { City } from 'country-state-city';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { useToast } from 'react-native-toast-notifications';
import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import logo from "../../../assets/D_logo_4.png";
import { fn_createBrandApi, fn_getCategoriesApi } from '../../../api/api';

import { BrandsSignupStyle, colors } from '../../../style/style';

const BrandsSignUp = ({ setIsAuthenticated }) => {

    const toast = useToast();
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const cities = City.getCitiesOfCountry("PK");
    const [selectedImage, setSelectedImage] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ brandName: '', email: '', phone: '', address: '', city: '', country: 'Pakistan', password: '', confirmPassword: '', category: '' });

    useEffect(() => {
        fn_getCategories();
    }, []);

    const fn_getCategories = async () => {
        const response = await fn_getCategoriesApi();
        if (response?.status) {
            setCategories(response?.data);
        } else {
            setCategories([]);
        }
    };

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
        if (!formData.category) {
            toast.show("❗ Category is required");
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
        if (!formData.confirmPassword) {
            toast.show("❗ Confirm Password is required");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.show("❗ Password and Confirm Password do not match");
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
            formDataToSend.append('category', formData.category);

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
                            <Text style={BrandsSignupStyle.BrandLogoText}>Brand Category</Text>
                            <SelectDropdown
                                data={categories}
                                search={true}
                                searchPlaceHolder="Search Category"
                                onSelect={(selectedItem) => {
                                    handleInputChange('category', selectedItem._id)
                                }}
                                renderButton={(selectedItem) => {
                                    return (
                                        <View style={{ ...BrandsSignupStyle.textInput, justifyContent: 'center' }}>
                                            <Text>
                                                {(selectedItem && selectedItem.name) || '--- Select Category ---'}
                                            </Text>
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View key={index} style={{ paddingVertical: 6, paddingHorizontal: 13, borderBottomWidth: 1, borderBottomColor: colors.lightBlack2, backgroundColor: isSelected ? colors.lightBlack2 : colors.white }}>
                                            <Text>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                            {errors.category && <Text style={{ color: 'red' }}>{errors.category}</Text>}
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
                            <SelectDropdown
                                data={cities}
                                search={true}
                                searchPlaceHolder="Search City"
                                onSelect={(selectedItem) => {
                                    handleInputChange('city', selectedItem.name)
                                }}
                                renderButton={(selectedItem) => {
                                    return (
                                        <View style={{ ...BrandsSignupStyle.textInput, justifyContent: 'center' }}>
                                            <Text>
                                                {(selectedItem && selectedItem.name) || '--- Select City ---'}
                                            </Text>
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View key={index} style={{ paddingVertical: 6, paddingHorizontal: 13, borderBottomWidth: 1, borderBottomColor: colors.lightBlack2, backgroundColor: isSelected ? colors.lightBlack2 : colors.white }}>
                                            <Text>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Country</Text>
                            <Text style={{ ...BrandsSignupStyle.textInput, lineHeight: 47 }}>{formData.country}</Text>
                            {errors.country && <Text style={{ color: 'red' }}>{errors.country}</Text>}
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Password</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    placeholder='Enter Password'
                                    placeholderTextColor={colors.normalGray}
                                    style={[BrandsSignupStyle.textInput, { paddingRight: 50 }]}
                                    value={formData.password}
                                    onChangeText={(value) => handleInputChange('password', value)}
                                    secureTextEntry={!passwordVisible}
                                    textContentType={passwordVisible ? 'password' : 'none'}
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
                            {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                        </View>
                        <View style={BrandsSignupStyle.inputBoxMain}>
                            <Text style={BrandsSignupStyle.BrandLogoText}>Confirm Password</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    placeholder='Confirm Password'
                                    placeholderTextColor={colors.normalGray}
                                    style={[BrandsSignupStyle.textInput, { paddingRight: 50 }]}
                                    value={formData.confirmPassword}
                                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                                    secureTextEntry={!confirmPasswordVisible}
                                    textContentType={confirmPasswordVisible ? 'password' : 'none'}
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
                                    onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                >
                                    <Feather
                                        name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                                        size={17}
                                        color={colors.mainColor}
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}
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