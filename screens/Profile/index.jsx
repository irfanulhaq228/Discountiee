import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { ProfileStyle } from '../../style/style';

import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottomBar';

function ProfileScreen() {
    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Profit"} />
            <ScrollView style={ProfileStyle.main} contentContainerStyle={{ paddingBottom: 130 }}>
                <View style={ProfileStyle.sec}>
                    <Text>Profile Content Goes Here</Text>
                </View>
            </ScrollView>
            <BottomBar />
        </View>
    );
}

export default ProfileScreen;