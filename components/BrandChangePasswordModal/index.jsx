import Modal from "react-native-modal";
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BrandsSettingStyle } from '../../style/style';
import { fn_updateBrandApi } from "../../api/api";
import { useToast } from "react-native-toast-notifications";

const BrandChangePasswordModal = ({ isModalVisible, toggleModal }) => {

    const toast = useToast();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    const handleUpdate = async () => {
        setError('');
        if (!oldPassword || !newPassword) {
            setError('Both fields are required.');
            return;
        }
        if (oldPassword === newPassword) {
            setError('Old and new passwords cannot be the same.');
            return;
        }

        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', newPassword);
        const response = await fn_updateBrandApi(formData);
        if (response.status) {
            toggleModal("password");
            setOldPassword('');
            setNewPassword('');
            toast.show(`✅ Password Updated Successfully`);
        } else {
            setError(`${response.message || 'Failed to update password.'}`);
        }
    };

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => {
                toggleModal("password");
                setOldPassword('');
                setNewPassword('');
                setError('');
            }}
            style={{ justifyContent: "center", alignItems: "center" }}
        >
            <View style={BrandsSettingStyle.modalContainer}>
                <View style={{ position: "relative", width: "100%" }}>
                    <TextInput
                        style={BrandsSettingStyle.input}
                        placeholder="Enter Old Password"
                        placeholderTextColor="#aaa"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />
                    <MaterialCommunityIcons name="lock-open-minus-outline" size={18} style={BrandsSettingStyle.modalLocationIcon} />
                </View>
                <View style={{ position: "relative", width: "100%" }}>
                    <TextInput
                        style={BrandsSettingStyle.input}
                        placeholder="Enter New Password"
                        placeholderTextColor="#aaa"
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <MaterialCommunityIcons name="lock-open-plus-outline" size={18} style={BrandsSettingStyle.modalLocationIcon} />
                </View>
                <View style={BrandsSettingStyle.buttonContainer}>
                    <TouchableOpacity
                        style={BrandsSettingStyle.cancelButton}
                        onPress={() => {
                            toggleModal("password");
                            setOldPassword('');
                            setNewPassword('');
                            setError('');
                        }}
                        activeOpacity={0.8}
                    >
                        <Text style={BrandsSettingStyle.cancalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={BrandsSettingStyle.updateButton}
                        onPress={handleUpdate}
                        activeOpacity={0.8}
                    >
                        <Text style={BrandsSettingStyle.buttonText}>Update</Text>
                    </TouchableOpacity>
                    {error ? <Text style={{ color: 'red', position: 'absolute', bottom: -19, fontSize: 12, width: '100%', textAlign: 'center' }}>{error}</Text> : null}
                </View>
            </View>
        </Modal>
    );
};

export default BrandChangePasswordModal;