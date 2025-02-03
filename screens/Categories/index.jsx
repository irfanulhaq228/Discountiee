import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { CategoriesStyle, Variables } from '../../style/style';

import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottomBar';
import BrandsList from '../../components/BrandsList';
import CategoriesList from '../../components/CategoriesList';

function CategoriesScreen({ mode, setMode, setSingleBrand, selectedCategory, setSelectedCategory, showMenu, setShowMenu }) {

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
            <TopBar text={"Categories"} showMenu={showMenu} setShowMenu={setShowMenu} setMode={setMode} mode={mode} />
            <ScrollView style={CategoriesStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={CategoriesStyle.sec}>
                    <CategoriesList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    <BrandsList selectedCategory={selectedCategory} setSingleBrand={setSingleBrand} />
                </View>
            </ScrollView>
            <BottomBar mode={mode} setSingleBrand={setSingleBrand} />
        </View>
    );
};

export default CategoriesScreen;