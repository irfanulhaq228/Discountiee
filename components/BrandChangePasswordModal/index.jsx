import React from 'react';
import Modal from "react-native-modal";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { BrandsSettingStyle } from '../../style/style';

const BrandChangePasswordModal = ({ isModalVisible, toggleModal }) => {
    return (
        <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal("password")} style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={BrandsSettingStyle.modalContainer}>
                <View style={{ position: "relative", width: "100%" }}>
                    <TextInput
                        style={BrandsSettingStyle.input}
                        placeholder="Enter Old Password"
                        placeholderTextColor="#aaa"
                    />
                    <MaterialCommunityIcons name="lock-open-minus-outline" size={18} style={BrandsSettingStyle.modalLocationIcon} />
                </View>
                <View style={{ position: "relative", width: "100%" }}>
                    <TextInput
                        style={BrandsSettingStyle.input}
                        placeholder="Enter New Password"
                        placeholderTextColor="#aaa"
                    />
                    <MaterialCommunityIcons name="lock-open-plus-outline" size={18} style={BrandsSettingStyle.modalLocationIcon} />
                </View>
                <View style={BrandsSettingStyle.buttonContainer}>
                    <TouchableOpacity style={BrandsSettingStyle.cancelButton} onPress={() => toggleModal("password")} activeOpacity={0.8}>
                        <Text style={BrandsSettingStyle.cancalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={BrandsSettingStyle.updateButton} onPress={() => toggleModal("password")} activeOpacity={0.8}>
                        <Text style={BrandsSettingStyle.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default BrandChangePasswordModal;