import React from 'react';
import Modal from "react-native-modal";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";

import Feather from "react-native-vector-icons/Feather";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { launchImageLibrary } from 'react-native-image-picker'; // Replace expo-image-picker with react-native-image-picker

import { BrandsSettingStyle } from '../../style/style';
import { fn_updateBrandApi } from '../../api/api';

const BrandSettingModal = ({ isModalVisible, toggleModal, brand, API_URL, toast, fn_getBrandsDetails }) => {

    const [brandName, setBrandName] = React.useState(brand?.name || '');
    const [brandAddress, setBrandAddress] = React.useState(brand?.address || '');
    const [originalBrandName, setOriginalBrandName] = React.useState(brand?.name || '');
    const [originalBrandAddress, setOriginalBrandAddress] = React.useState(brand?.address || '');
    const [brandLogo, setBrandLogo] = React.useState(`${API_URL}/${brand?.logo}`);
    const [originalBrandLogo, setOriginalBrandLogo] = React.useState(`${API_URL}/${brand?.logo}`);

    React.useEffect(() => {
        if (isModalVisible) {
            setBrandName(brand?.name || '');
            setBrandAddress(brand?.address || '');
            setOriginalBrandName(brand?.name || '');
            setOriginalBrandAddress(brand?.address || '');
            setBrandLogo(`${API_URL}/${brand?.logo}`);
            setOriginalBrandLogo(`${API_URL}/${brand?.logo}`);
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
        if (brandName.trim() === "" || brandAddress.trim() === "") {
            toast.show(`❗ Please fill all the fields`);
            return;
        }

        const formData = new FormData();
        formData.append('name', brandName);
        formData.append('address', brandAddress);

        if (brandLogo !== originalBrandLogo) {
            const filename = brandLogo.split('/').pop();
            const type = `image/${filename.split('.').pop()}`;
            formData.append('logo', { uri: brandLogo, name: filename, type });
        }

        const response = await fn_updateBrandApi(formData);

        if (response.status) {
            toast.show(`✅ Brand updated successfully`);
            fn_getBrandsDetails();
            toggleModal("profile");
        } else {
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
                <View style={BrandsSettingStyle.buttonContainer}>
                    <TouchableOpacity
                        style={BrandsSettingStyle.cancelButton}
                        onPress={() => {
                            setBrandName(originalBrandName);
                            setBrandAddress(originalBrandAddress);
                            setBrandLogo(originalBrandLogo);
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