import React from 'react'
import { Image, Text, View } from 'react-native'
import { BrandsHomeListStyle } from '../../style/style'

import img1 from "../../assets/grid1.jpg";
import img2 from "../../assets/grid2.jpg";
import img3 from "../../assets/grid3.png";
import img4 from "../../assets/grid4.jpg";

const BrandsGridList = () => {
    return (
        <View style={BrandsHomeListStyle.gridMain}>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img1} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img2} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img3} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img4} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img1} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img2} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img3} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img4} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img1} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img2} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img3} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img4} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
            <View style={BrandsHomeListStyle.gridSingleBox}>
                <Image source={img1} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
        </View>
    )
}

export default BrandsGridList