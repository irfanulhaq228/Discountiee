import React from 'react';
import { ScrollView, View } from 'react-native';

import { HomeStyle, Variables } from '../../style/style';

import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottomBar';

// import Icon from 'react-native-vector-icons/FontAwesome';

import RecentDeals from '../../components/RecentDeals';
import CategoriesList from '../../components/CategoriesList';
import FeaturedDiscount from '../../components/FeaturedDiscounts';

function HomeScreen({ setSingleBrand, selectedCategory, setSelectedCategory }) {
    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Home"} />
            <ScrollView style={HomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={HomeStyle.sec}>
                    {/* search box */}
                    {/* <View style={HomeStyle.searchBox}>
                        <TextInput
                            style={HomeStyle.searchInput}
                            placeholder="Search Discountiee..."
                            placeholderTextColor={"gray"}
                        />
                        <Icon name="search" style={HomeStyle.searchIcon} />
                    </View> */}
                    {/* featured discounts */}
                    <FeaturedDiscount />
                    {/* categories list */}
                    <CategoriesList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    {/* top deals */}
                    <RecentDeals setSingleBrand={setSingleBrand} />
                </View>
            </ScrollView>
            <BottomBar setSingleBrand={setSingleBrand} />
        </View>
    );
}

export default HomeScreen;
