import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import BrandsGridList from "../../../components/BrandsGridList";
import { BrandsHomeListStyle, BrandsHomeStyle, colors, Variables } from "../../../style/style";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";

const BrandsHome = ({ mode, setMode, showMenu, setShowMenu }) => {

    const [tab, setTab] = useState("grid");

    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Home"} showMenu={showMenu} setShowMenu={setShowMenu} setMode={setMode} mode={mode} />
            <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={BrandsHomeListStyle.sec}>
                    <View style={BrandsHomeListStyle.tabs}>
                        <TouchableOpacity activeOpacity={0.8} style={{ ...BrandsHomeListStyle.tab, borderBottomColor: tab === "grid" ? colors.mainColor : colors.lightMainColor }} onPress={() => setTab("grid")}>
                            {tab === "grid" ? (
                                <Ionicons name="grid" size={23} style={{ color: colors.mainColor }} />
                            ) : (
                                <Ionicons name="grid-outline" size={23} style={{ color: colors.lightMainColor }} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={{ ...BrandsHomeListStyle.tab, borderBottomColor: tab === "list" ? colors.mainColor : colors.lightMainColor }} onPress={() => setTab("list")}>
                            {tab === "list" ? (
                                <FontAwesome6 name="list-ul" size={23} style={{ color: colors.mainColor }} />
                            ) : (
                                <FontAwesome6 name="list-ul" size={23} style={{ color: colors.lightMainColor }} />
                            )}
                        </TouchableOpacity>
                    </View>
                    {tab === "grid" && <BrandsGridList />}
                </View>
            </ScrollView>
            <BrandsBottomBar />
        </View>
    )
}

export default BrandsHome