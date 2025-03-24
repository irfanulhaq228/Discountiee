import { useState } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";

import { BrandsHomeStyle, BrandsSettingStyle, colors, SingleBrandStyle, Variables } from "../../../style/style";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";
import BrandSettingModal from "../../../components/BrandSettingModal";

import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
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
                        <View>
                            <FontAwesome6 name="location-dot" style={SingleBrandStyle.locationIcon} size={18} />
                            <Text style={SingleBrandStyle.locationText}>Ali Town, Lahore, Pakistan</Text>
                        </View>
                        <View style={SingleBrandStyle.seperator}></View>
                        <View style={BrandsSettingStyle.settingsList}>
                            <View style={BrandsSettingStyle.singleSetting}>
                                <AntDesign name="upload" size={20} />
                                <Text>Add Discount</Text>
                            </View>
                            <View style={BrandsSettingStyle.singleSetting}>
                                <SimpleLineIcons name="lock" size={20} />
                                <Text>Change Password</Text>
                            </View>
                            <View style={BrandsSettingStyle.singleSetting}>
                                <SimpleLineIcons name="graph" size={20} />
                                <Text>Posts Analytics</Text>
                            </View>
                            <View style={BrandsSettingStyle.singleSetting}>
                                <SimpleLineIcons name="bell" size={20} />
                                <Text>My Notifications</Text>
                            </View>
                            <View style={BrandsSettingStyle.singleSetting}>
                                <Ionicons name="shield-checkmark-outline" size={20} />
                                <Text>Privacy Policy</Text>
                            </View>
                            <View style={BrandsSettingStyle.singleSetting}>
                                <Ionicons name="information-circle-outline" size={23} />
                                <Text style={{ marginLeft: -4 }}>Help Center</Text>
                            </View>
                            <View style={{ ...BrandsSettingStyle.singleSetting, borderColor: colors.transparent }}>
                                <SimpleLineIcons name="logout" size={20} style={{ color: "red" }} />
                                <Text style={{ color: "red" }}>Logout</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BrandsBottomBar />
            </View>
            <BrandSettingModal isModalVisible={isModalVisible} toggleModal={toggleModal} brandName={brandName} setBrandName={setBrandName} />
        </>
    )
}

export default BrandsSettings;