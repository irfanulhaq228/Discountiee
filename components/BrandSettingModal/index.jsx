import React from 'react';
import Modal from "react-native-modal";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";

import Feather from "react-native-vector-icons/Feather";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import { BrandsSettingStyle } from '../../style/style';

import brandImg from "../../assets/Brands_Logo/McDonald's.png";

const BrandSettingModal = ({ isModalVisible, toggleModal, brandName, setBrandName }) => {
    return (
        <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal("profile")} style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={BrandsSettingStyle.modalContainer}>
                <View style={BrandsSettingStyle.modalProfileImage}>
                    <Image source={brandImg} style={{ width: "100%", height: "100%", borderRadius: 130 }} />
                    <TouchableOpacity style={BrandsSettingStyle.modalProfileEdit}>
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
                        value={"Ali Town, Lahore, Pakistan"}
                        placeholder="Enter Location"
                        placeholderTextColor="#aaa"
                    />
                    <FontAwesome6 name="location-dot" size={18} style={BrandsSettingStyle.modalLocationIcon} />
                </View>
                <View style={BrandsSettingStyle.buttonContainer}>
                    <TouchableOpacity style={BrandsSettingStyle.cancelButton} onPress={() => toggleModal("profile")} activeOpacity={0.8}>
                        <Text style={BrandsSettingStyle.cancalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={BrandsSettingStyle.updateButton} onPress={() => toggleModal("profile")} activeOpacity={0.8}>
                        <Text style={BrandsSettingStyle.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default BrandSettingModal