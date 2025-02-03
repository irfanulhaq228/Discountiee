import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';

import { HomeStyle, Variables } from '../../style/style';

import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottomBar';

// import Icon from 'react-native-vector-icons/FontAwesome';

import RecentDeals from '../../components/RecentDeals';
import CategoriesList from '../../components/CategoriesList';
import FeaturedDiscount from '../../components/FeaturedDiscounts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

function HomeScreen({ mode, setMode, setSingleBrand, selectedCategory, setSelectedCategory, showMenu, setShowMenu }) {

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            if (mode === "brand") {
                navigation.navigate('BrandsSignUp');
            }
        }, [navigation, mode])
    );

    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Home"} showMenu={showMenu} setShowMenu={setShowMenu} setMode={setMode} mode={mode} />
            <ScrollView style={HomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={HomeStyle.sec}>
                    {/* featured discounts */}
                    <FeaturedDiscount />
                    {/* categories list */}
                    <CategoriesList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    {/* top deals */}
                    <RecentDeals setSingleBrand={setSingleBrand} />
                </View>
            </ScrollView>
            <BottomBar mode={mode} setSingleBrand={setSingleBrand} />
        </View>
    );
};

export default HomeScreen;
