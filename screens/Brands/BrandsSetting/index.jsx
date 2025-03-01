import { ScrollView, Text, View } from "react-native";

import { BrandsHomeStyle, Variables } from "../../../style/style";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";

const BrandsSettings = ({ mode, setMode, showMenu, setShowMenu }) => {
    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Settings"} showMenu={showMenu} setShowMenu={setShowMenu} setMode={setMode} mode={mode} />
            <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={BrandsHomeStyle.sec}>
                    <Text>Brands Settings</Text>
                </View>
            </ScrollView>
            <BrandsBottomBar />
        </View>
    )
}

export default BrandsSettings;