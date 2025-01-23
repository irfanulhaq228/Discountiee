import { BlurView } from '@react-native-community/blur';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, Animated, Dimensions } from 'react-native';

import { HomeStyle } from '../../style/style';

import { featuredDiscounts } from '../../data';

const { width } = Dimensions.get('window');

const FeaturedDiscount = () => {

    const slideRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % featuredDiscounts.length;
            setCurrentIndex(nextIndex);

            slideRef.current?.scrollToOffset({
                offset: nextIndex * width,
                animated: true
            });
        }, 3500);

        return () => clearInterval(timer);
    }, [currentIndex]);

    const renderItem = ({ item }) => {
        return (
            <View style={[HomeStyle.featuredDiscount, { width: width - 16, position: "relative" }]}>
                <Image
                    source={item.img}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 7,
                        objectFit: 'cover',
                    }}
                    resizeMode="cover"
                />

                <BlurView
                    style={{
                        position: "absolute",
                        width: '100%',
                        height: '100%',
                        borderRadius: 7,
                        overflow: 'hidden',
                    }}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                >
                    <Image
                        source={item.img}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 7,
                            objectFit: 'contain',
                        }}
                        resizeMode="cover"
                    />
                </BlurView>
            </View>
        );
    };

    return (
        <View style={{ height: 150 }}>
            <Animated.FlatList
                ref={slideRef}
                data={featuredDiscounts}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(newIndex);
                }}
            />
        </View>
    );
};

export default FeaturedDiscount;