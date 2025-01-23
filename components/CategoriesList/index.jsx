import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

import { capitalizeText, colors, HomeStyle } from '../../style/style';

import { Categories } from '../../data';

const CategoriesList = ({ selectedCategory, setSelectedCategory }) => {
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHomeScreen, setIsHomeScreen] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', (e) => {
            const currentRoute = e.data.state.routes[e.data.state.index];
            setIsHomeScreen(currentRoute.name === 'Home');
        });

        return unsubscribe;
    }, [navigation]);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: scrollPosition, animated: true });
        }
    };

    return (
        <View style={{ gap: 5 }}>
            <Text style={HomeStyle.categoriesListHeading}>All Categories</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={HomeStyle.categoryBoxes}
                ref={scrollViewRef}
                onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
                scrollEventThrottle={16}
            >
                {Categories?.map((category, index) => (
                    <CategoryBox key={index} category={category} navigation={navigation} selectedCategory={selectedCategory} setSelectedCategory={handleCategorySelect} isHomeScreen={isHomeScreen} />
                ))}
            </ScrollView>
        </View>
    );
};

export default CategoriesList;

const CategoryBox = ({ category, navigation, selectedCategory, setSelectedCategory, isHomeScreen }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{ ...HomeStyle.categoryBox, borderColor: (selectedCategory === category?.id && !isHomeScreen) ? colors.mainColor : colors.gray }}
            onPress={() => {
                isHomeScreen && navigation.navigate('Categories');
                setSelectedCategory(category?.id);
            }}
        >
            <Image source={category?.img} style={HomeStyle.categoryImg} />
            <View style={HomeStyle.categoryBoxTextView}>
                <Text style={HomeStyle.categoryBoxText}>{capitalizeText(category?.name)}</Text>
            </View>
        </TouchableOpacity>
    );
};
