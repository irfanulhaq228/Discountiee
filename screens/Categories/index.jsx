import React from 'react';
import { View, ScrollView } from 'react-native';

import { CategoriesStyle, Variables } from '../../style/style';

import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottomBar';
import BrandsList from '../../components/BrandsList';
import CategoriesList from '../../components/CategoriesList';

function CategoriesScreen({ setSingleBrand, selectedCategory, setSelectedCategory }) {
    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Categories"} />
            <ScrollView style={CategoriesStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={CategoriesStyle.sec}>
                    <CategoriesList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    <BrandsList selectedCategory={selectedCategory} setSingleBrand={setSingleBrand} />
                </View>
            </ScrollView>
            <BottomBar setSingleBrand={setSingleBrand} />
        </View>
    );
};

export default CategoriesScreen;