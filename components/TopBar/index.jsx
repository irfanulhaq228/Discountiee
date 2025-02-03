import React from 'react';
import Menu from '../Menu';
import LinearGradient from 'react-native-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TopBarStyle, colors } from '../../style/style';

function TopBar({ mode, setMode, text, showMenu, setShowMenu }) {

    return (
        <>
            <Menu mode={mode} setMode={setMode} showMenu={showMenu} setShowMenu={setShowMenu} />
            <View style={TopBarStyle.main}>
                <LinearGradient colors={[colors.mainColor, colors.secColor]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={TopBarStyle.sec}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setShowMenu(true)}>
                        <MaterialCommunityIcons name="menu" style={{ ...TopBarStyle.icon, marginEnd: 10 }} />
                    </TouchableOpacity>
                    {text === "Home" && <Icon name="home" style={TopBarStyle.icon} />}
                    {text === "Categories" && <MaterialIcons name="category" style={TopBarStyle.icon} />}
                    {text === "Brand Information" && <MaterialCommunityIcons name="shopping-search" style={TopBarStyle.icon} />}
                    {text === "Upload Discount" && <Entypo name="upload" style={TopBarStyle.icon} />}
                    <Text style={TopBarStyle.text}>{text}</Text>
                </LinearGradient>
            </View>
        </>
    );
}

export default TopBar;
