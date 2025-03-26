import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";

import { BrandsHomeStyle, BrandsSettingStyle, colors, SingleBrandStyle, Variables } from "../../../style/style";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";
import BrandSettingModal from "../../../components/BrandSettingModal";
import BrandChangePasswordModal from "../../../components/BrandChangePasswordModal";

import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import brandImg from "../../../assets/Brands_Logo/McDonald's.png";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const BrandsSettings = ({ mode, setMode, showMenu, setShowMenu }) => {

    const navigation = useNavigation();
    const [brandName, setBrandName] = useState("McDonald's");
    const [isModalVisible, setModalVisible] = useState(false);
    const [isChPasswordModalVisible, setChPasswordModalVisible] = useState(false);

    const toggleModal = (label) => {
        if (label === "profile") setModalVisible(!isModalVisible);
        if (label === "password") setChPasswordModalVisible(!isChPasswordModalVisible);
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
                            <TouchableOpacity onPress={() => toggleModal("profile")} style={BrandsSettingStyle.profileEdit}>
                                <Feather name="edit" style={BrandsSettingStyle.profileEditIcon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={SingleBrandStyle.brandName}>{brandName}</Text>
                        <View>
                            <FontAwesome6 name="location-dot" style={SingleBrandStyle.locationIcon} size={18} />
                            <Text style={SingleBrandStyle.locationText}>Ali Town, Lahore, Pakistan</Text>
                        </View>
                        <View style={SingleBrandStyle.seperator}></View>
                        <View style={BrandsSettingStyle.settingsList}>
                            <TouchableOpacity style={BrandsSettingStyle.singleSetting} onPress={() => navigation.navigate('BrandsDiscountAdd')} activeOpacity={0.8}>
                                <AntDesign name="upload" size={20} />
                                <Text>Add Discount</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={BrandsSettingStyle.singleSetting} activeOpacity={0.8} onPress={() => toggleModal("password")}>
                                <SimpleLineIcons name="lock" size={20} />
                                <Text>Change Password</Text>
                            </TouchableOpacity>
                            <View style={BrandsSettingStyle.singleSetting}>
                                <SimpleLineIcons name="graph" size={20} />
                                <Text>Posts Analytics</Text>
                            </View>
                            <TouchableOpacity style={BrandsSettingStyle.singleSetting} onPress={() => navigation.navigate('BrandsNotifications')} activeOpacity={0.8}>
                                <SimpleLineIcons name="bell" size={20} />
                                <Text>My Notifications</Text>
                            </TouchableOpacity>
                            <View style={BrandsSettingStyle.singleSetting}>
                                <Ionicons name="shield-checkmark-outline" size={20} />
                                <Text>Privacy Policy</Text>
                            </View>
                            <View style={BrandsSettingStyle.singleSetting}>
                                <Ionicons name="information-circle-outline" size={23} />
                                <Text style={{ marginLeft: -4 }}>Help Center</Text>
                            </View>
                            <TouchableOpacity style={{ ...BrandsSettingStyle.singleSetting, borderColor: colors.transparent }} onPress={() => navigation.navigate('BrandsSignIn')} activeOpacity={0.8}>
                                <SimpleLineIcons name="logout" size={20} style={{ color: "red" }} />
                                <Text style={{ color: "red" }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <BrandsBottomBar />
            </View>
            <BrandSettingModal isModalVisible={isModalVisible} toggleModal={toggleModal} brandName={brandName} setBrandName={setBrandName} />
            <BrandChangePasswordModal isModalVisible={isChPasswordModalVisible} toggleModal={toggleModal} />
        </>
    )
}

export default BrandsSettings;