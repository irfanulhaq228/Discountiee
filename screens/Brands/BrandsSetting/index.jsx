import { useState } from "react";
import Modal from "react-native-modal";
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity } from "react-native";

import { BrandsHomeStyle, BrandsSettingStyle, SingleBrandStyle, Variables } from "../../../style/style";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";

import Feather from "react-native-vector-icons/Feather";
import brandImg from "../../../assets/Brands_Logo/McDonald's.png";

const BrandsSettings = ({ mode, setMode, showMenu, setShowMenu }) => {

    const [brandName, setBrandName] = useState("McDonald's");
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <>
            <View style={{ flex: 1 }}>
                <TopBar text={"Settings"} showMenu={showMenu} setShowMenu={setShowMenu} setMode={setMode} mode={mode} />
                <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                    <View style={SingleBrandStyle.bgDesign}></View>
                    <View style={SingleBrandStyle.sec}>
                        <View style={BrandsSettingStyle.profileImage}>
                            <Image source={brandImg} style={{ width: "100%", height: "100%", borderRadius: 150 }} />
                            <TouchableOpacity onPress={toggleModal} style={BrandsSettingStyle.profileEdit}>
                                <Feather name="edit" style={BrandsSettingStyle.profileEditIcon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={SingleBrandStyle.brandName}>{brandName}</Text>
                    </View>
                </ScrollView>
                <BrandsBottomBar />
            </View>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={{ justifyContent: "center", alignItems: "center" }}>
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
                    <View style={BrandsSettingStyle.buttonContainer}>
                        <TouchableOpacity style={BrandsSettingStyle.cancelButton} onPress={toggleModal}>
                            <Text style={BrandsSettingStyle.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={BrandsSettingStyle.updateButton} onPress={toggleModal}>
                            <Text style={BrandsSettingStyle.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default BrandsSettings;