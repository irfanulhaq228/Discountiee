import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TopBarStyle, colors } from '../../style/style';

function TopBar({ text }) {

    return (
        <View style={TopBarStyle.main}>
            <LinearGradient colors={[colors.mainColor, colors.secColor]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={TopBarStyle.sec}>
                {text === "Home" && <Icon name="home" style={TopBarStyle.icon} />}
                {text === "Categories" && <MaterialIcons name="category" style={TopBarStyle.icon} />}
                {text === "Brand Information" && <MaterialCommunityIcons name="shopping-search" style={TopBarStyle.icon} />}
                <Text style={TopBarStyle.text}>{text}</Text>
            </LinearGradient>
        </View>
    );
}

export default TopBar;
