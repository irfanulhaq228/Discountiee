import React from 'react';
import Modal from "react-native-modal";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";

import Feather from "react-native-vector-icons/Feather";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdown

import { BrandsSettingStyle, SingleBrandStyle } from '../../style/style';
import { fn_updateBrandApi } from '../../api/api';

const BrandSettingModal = ({ isModalVisible, toggleModal, brand, API_URL, toast, fn_getBrandsDetails, categories, setLoader }) => {

    const [brandName, setBrandName] = React.useState(brand?.name || '');
    const [brandAddress, setBrandAddress] = React.useState(brand?.address || '');
    const [brandCity, setBrandCity] = React.useState(brand?.city || '');
    const [brandCountry, setBrandCountry] = React.useState(brand?.country || '');
    const [originalBrandName, setOriginalBrandName] = React.useState(brand?.name || '');
    const [originalBrandAddress, setOriginalBrandAddress] = React.useState(brand?.address || '');
    const [originalBrandCity, setOriginalBrandCity] = React.useState(brand?.city || '');
    const [originalBrandCountry, setOriginalBrandCountry] = React.useState(brand?.country || '');
    const [brandLogo, setBrandLogo] = React.useState(`${API_URL}/${brand?.logo}`);
    const [originalBrandLogo, setOriginalBrandLogo] = React.useState(`${API_URL}/${brand?.logo}`);
    const [selectedCategory, setSelectedCategory] = React.useState(brand?.category || '');

    React.useEffect(() => {
        if (isModalVisible) {
            setBrandName(brand?.name || '');
            setBrandAddress(brand?.address || '');
            setBrandCity(brand?.city || '');
            setBrandCountry(brand?.country || '');
            setOriginalBrandName(brand?.name || '');
            setOriginalBrandAddress(brand?.address || '');
            setOriginalBrandCity(brand?.city || '');
            setOriginalBrandCountry(brand?.country || '');
            setBrandLogo(`${API_URL}/${brand?.logo}`);
            setOriginalBrandLogo(`${API_URL}/${brand?.logo}`);
            setSelectedCategory(brand?.category || '');
        }
    }, [isModalVisible, brand]);

    const pickImage = async () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User canceled image picker');
            } else if (response.errorCode) {
                console.error('ImagePicker Error: ', response.errorMessage);
                toast.show(`❗ Error selecting image`);
            } else if (response.assets && response.assets.length > 0) {
                setBrandLogo(response.assets[0].uri);
            }
        });
    };

    const fn_updateBrand = async () => {
        toast.hideAll();
        if (brandName.trim() === "" || brandAddress.trim() === "" || brandCity.trim() === "" || brandCountry.trim() === "") {
            toast.show(`❗ Please fill all the fields`);
            return;
        }

        const formData = new FormData();
        formData.append('name', brandName);
        formData.append('address', brandAddress);
        formData.append('city', brandCity);
        formData.append('country', brandCountry);
        formData.append('category', selectedCategory); // Add selected category ID to payload

        if (brandLogo !== originalBrandLogo) {
            const filename = brandLogo.split('/').pop();
            const type = `image/${filename.split('.').pop()}`;
            formData.append('logo', { uri: brandLogo, name: filename, type });
        }
        setLoader(true);
        toggleModal("profile");
        const response = await fn_updateBrandApi(formData);

        if (response.status) {
            setLoader(false);
            toast.show(`✅ Brand updated successfully`);
            fn_getBrandsDetails();
        } else {
            setLoader(false);
            toast.show(`❗ ${response.message || 'Failed to update brand'}`);
        }
    };

    return (
        <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal("profile")} style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={BrandsSettingStyle.modalContainer}>
                <View style={BrandsSettingStyle.modalProfileImage}>
                    <Image source={{ uri: brandLogo }} style={{ width: "100%", height: "100%", borderRadius: 130 }} />
                    <TouchableOpacity style={BrandsSettingStyle.modalProfileEdit} onPress={pickImage}>
                        <Feather name="edit" style={BrandsSettingStyle.profileEditIcon} />
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={BrandsSettingStyle.input}
                    value={brandName}
                    onChangeText={setBrandName}
                    placeholder="Enter brand name"
                    placeholderTextColor="#aaa"
                />
                <View style={{ position: "relative", width: "100%" }}>
                    <TextInput
                        style={BrandsSettingStyle.input}
                        value={brandAddress}
                        onChangeText={setBrandAddress}
                        placeholder="Enter Location"
                        placeholderTextColor="#aaa"
                    />
                    <FontAwesome6 name="location-dot" size={18} style={BrandsSettingStyle.modalLocationIcon} />
                </View>
                <TextInput
                    style={BrandsSettingStyle.input}
                    value={brandCity}
                    onChangeText={setBrandCity}
                    placeholder="Enter City"
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={BrandsSettingStyle.input}
                    value={brandCountry}
                    onChangeText={setBrandCountry}
                    placeholder="Enter Country"
                    placeholderTextColor="#aaa"
                />
                <View style={{ ...SingleBrandStyle.seperator, width: "100%", marginVertical: 0, marginTop: 5 }}></View>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    style={BrandsSettingStyle.select}
                >
                    {categories.map((category) => (
                        <Picker.Item key={category._id} label={category.name} value={category._id} />
                    ))}
                </Picker>
                <View style={{ ...SingleBrandStyle.seperator, width: "100%", marginVertical: 0, marginBottom: 5 }}></View>
                <View style={BrandsSettingStyle.buttonContainer}>
                    <TouchableOpacity
                        style={BrandsSettingStyle.cancelButton}
                        onPress={() => {
                            setBrandName(originalBrandName);
                            setBrandAddress(originalBrandAddress);
                            setBrandCity(originalBrandCity);
                            setBrandCountry(originalBrandCountry);
                            setBrandLogo(originalBrandLogo);
                            setSelectedCategory(brand?.category || '');
                            toggleModal("profile");
                        }}
                        activeOpacity={0.8}
                    >
                        <Text style={BrandsSettingStyle.cancalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={BrandsSettingStyle.updateButton} onPress={fn_updateBrand} activeOpacity={0.8}>
                        <Text style={BrandsSettingStyle.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default BrandSettingModal