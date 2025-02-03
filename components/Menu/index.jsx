import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Animated, Text, TouchableOpacity, View } from "react-native";

import { MenuStyle } from "../../style/style";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Menu = ({ mode, setMode, showMenu, setShowMenu }) => {
    const navigation = useNavigation();
    const animatedLeft = useRef(new Animated.Value(-280)).current;
    useEffect(() => {
        Animated.timing(animatedLeft, {
            toValue: showMenu ? 0 : -280,
            duration: 400,
            useNativeDriver: false,
        }).start();
    }, [showMenu]);
    const toggleMenu = () => {
        if (showMenu) {
            Animated.timing(animatedLeft, {
                toValue: -280,
                duration: 400,
                useNativeDriver: false,
            }).start(() => setShowMenu(false));
        } else {
            setShowMenu(true);
            Animated.timing(animatedLeft, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false,
            }).start();
        }
    };
    const fn_swithMode = () => {
        toggleMenu();
        if (mode === "user") {
            setMode("brand");
            navigation.navigate('BrandsSignIn')
        } else {
            setMode("user");
            navigation.navigate('Home')
        }
    }
    return (
        <>
            {showMenu && (
                <View style={MenuStyle.main}>
                    <Animated.View style={[MenuStyle.sec, { left: animatedLeft }]}>
                        {/* top area */}
                        <View style={MenuStyle.topArea}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                <MaterialCommunityIcons name="menu" size={25} />
                                <Text style={{ fontSize: 18, fontWeight: 500 }}>Menu</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.8} style={MenuStyle.topCrossIcon} onPress={toggleMenu}>
                                <Entypo name="cross" size={23} />
                            </TouchableOpacity>
                        </View>
                        <View style={MenuStyle.midArea}></View>
                        {/* bottom area */}
                        <View style={MenuStyle.bottomArea}>
                            <TouchableOpacity activeOpacity={0.8} style={MenuStyle.bottomButton} onPress={fn_swithMode}>
                                {mode === "brand" && <FontAwesome5 name="user-alt" size={19} style={MenuStyle.bottomButtonIcon} />}
                                {mode === "user" && <Entypo name="shop" size={21} style={MenuStyle.bottomButtonIcon} />}
                                <Text style={MenuStyle.bottomButtonText}>Switch to {mode === "brand" ? "User" : "Brand"} Mode</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            )}
        </>
    );
}

export default Menu