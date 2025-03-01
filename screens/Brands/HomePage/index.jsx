import { ScrollView, Text, View } from "react-native";

import { BrandsHomeStyle, Variables } from "../../../style/style";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";

const BrandsHome = ({ mode, setMode, showMenu, setShowMenu }) => {
    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Home"} showMenu={showMenu} setShowMenu={setShowMenu} setMode={setMode} mode={mode} />
            <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={BrandsHomeStyle.sec}>
                    <Text>Brands List</Text>
                </View>
            </ScrollView>
            <BrandsBottomBar />
        </View>
    )
}

export default BrandsHome