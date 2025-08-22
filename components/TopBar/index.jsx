import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { TopBarStyle, colors } from '../../style/style';

function TopBar({ text }) {

    return (
        <>
            <View style={TopBarStyle.main}>
                <LinearGradient colors={[colors.mainColor, colors.secColor]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={TopBarStyle.sec}>
                    {text === "Home" && <Icon name="home" style={TopBarStyle.icon} />}
                    {text === "Settings" && <SimpleLineIcons name="settings" style={TopBarStyle.icon} />}
                    {text === "Add Discount" && <Entypo name="upload" style={TopBarStyle.icon} />}
                    {text === "Discount Details" && <Foundation name="page-edit" style={TopBarStyle.icon} />}
                    <Text style={TopBarStyle.text}>{text}</Text>
                </LinearGradient>
            </View>
        </>
    );
}

export default TopBar;
