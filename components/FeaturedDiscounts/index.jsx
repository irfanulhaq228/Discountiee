import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions } from 'react-native';

import img from "../../assets/sapphire_featured_1.webp";

const FeaturedDiscount = () => {
    const [imageHeight, setImageHeight] = useState(200);

    useEffect(() => {
        const imageSource = Image.resolveAssetSource(img);

        if (imageSource?.uri) {
            Image.getSize(imageSource.uri, (width, height) => {
                const screenWidth = Dimensions.get('window').width;
                const aspectRatio = width / height;
                setImageHeight(screenWidth / aspectRatio);
            });
        }
    }, []);

    return (
        <View style={{ backgroundColor: 'black', borderRadius: 7, overflow: 'hidden' }}>
            <Image source={img} style={{ width: '100%', height: imageHeight, borderRadius: 7 }} resizeMode="contain" />
        </View>
    );
};

export default FeaturedDiscount;
