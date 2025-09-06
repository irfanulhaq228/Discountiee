import { City } from 'country-state-city';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";

import { API_URL, fn_getBrandsDetailApi, fn_getCategoriesApi } from "../../../api/api";
import { BrandsHomeStyle, BrandsSettingStyle, colors, SingleBrandStyle, Variables } from "../../../style/style";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";
import BrandSettingModal from "../../../components/BrandSettingModal";
import BrandChangePasswordModal from "../../../components/BrandChangePasswordModal";

import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import RoundLoader from "../../../components/RoundLoader";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const BrandsSettings = ({ setIsAuthenticated }) => {

    const toast = useToast();
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const cities = City.getCitiesOfCountry("PK");
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isChPasswordModalVisible, setChPasswordModalVisible] = useState(false);

    const [data, setData] = useState(null);

    useEffect(() => {
        setLoader(true);
        fn_getCategories();
        fn_getBrandsDetails();
    }, []);

    const toggleModal = (label) => {
        if (label === "profile") setModalVisible(!isModalVisible);
        if (label === "password") setChPasswordModalVisible(!isChPasswordModalVisible);
    };

    const fn_getCategories = async () => {
        const response = await fn_getCategoriesApi();
        if (response?.status) {
            setCategories(response?.data);
        } else {
            setCategories([]);
        }
    };

    const fn_getBrandsDetails = async () => {
        const response = await fn_getBrandsDetailApi();
        setLoader(false);
        if (response?.status) {
            setData(response?.data);
        }
    };

    const fn_logout = async () => {
        toast.hideAll();
        toast.show(`✅ Logout Successfully`);
        setIsAuthenticated(null);
        await AsyncStorage.removeItem('id');
        navigation.navigate('BrandsSignIn');
    };

    return (
        <>
            {loader && <RoundLoader />}
            <View style={{ flex: 1 }}>
                <TopBar text={"Settings"} />
                <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                    <View style={SingleBrandStyle.bgDesign}></View>
                    <View style={SingleBrandStyle.sec}>
                        <View style={BrandsSettingStyle.profileImage}>
                            <Image source={{ uri: `${data?.logo}` }} style={{ width: "100%", height: "100%", borderRadius: 150 }} />
                            <TouchableOpacity onPress={() => toggleModal("profile")} style={BrandsSettingStyle.profileEdit}>
                                <Feather name="edit" style={BrandsSettingStyle.profileEditIcon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={SingleBrandStyle.brandName}>{data?.name}</Text>
                        <View>
                            <FontAwesome6 name="location-dot" style={SingleBrandStyle.locationIcon} size={14} />
                            <Text style={SingleBrandStyle.locationText}>{data?.address}, {data?.city}, {data?.country}</Text>
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
                            {/* <View style={BrandsSettingStyle.singleSetting}>
                                <SimpleLineIcons name="graph" size={20} />
                                <Text>Posts Analytics</Text>
                            </View> */}
                            {/* <TouchableOpacity style={BrandsSettingStyle.singleSetting} onPress={() => navigation.navigate('BrandsNotifications')} activeOpacity={0.8}>
                                <SimpleLineIcons name="bell" size={20} />
                                <Text>My Notifications</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={BrandsSettingStyle.singleSetting} onPress={() => navigation.navigate('PrivacyPolicy')} activeOpacity={0.8}>
                                <Ionicons name="shield-checkmark-outline" size={20} />
                                <Text>Privacy Policy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={BrandsSettingStyle.singleSetting} onPress={() => navigation.navigate('HelpCenter')} activeOpacity={0.8}>
                                <Ionicons name="information-circle-outline" size={23} />
                                <Text style={{ marginLeft: -4 }}>Help Center</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...BrandsSettingStyle.singleSetting, borderColor: colors.transparent }} onPress={fn_logout} activeOpacity={0.8}>
                                <SimpleLineIcons name="logout" size={20} style={{ color: "red" }} />
                                <Text style={{ color: "red" }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <BrandsBottomBar />
            </View>
            <BrandSettingModal isModalVisible={isModalVisible} toggleModal={toggleModal} brand={data} API_URL={API_URL} toast={toast} fn_getBrandsDetails={fn_getBrandsDetails} categories={categories} setLoader={setLoader} cities={cities} />
            <BrandChangePasswordModal isModalVisible={isChPasswordModalVisible} toggleModal={toggleModal} />
        </>
    )
}

export default BrandsSettings;