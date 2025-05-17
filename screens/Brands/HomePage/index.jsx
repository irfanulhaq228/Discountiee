import { useEffect, useState, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View, Animated, Easing } from "react-native";

import { fn_getPostsByIDApi } from "../../../api/api";
import BrandsGridList from "../../../components/BrandsGridList";
import { BrandsHomeListStyle, BrandsHomeStyle, colors, Variables } from "../../../style/style";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";
import BrandPostListView from "../../../components/BrandPostListView";

const BrandsHome = () => {
    const [tab, setTab] = useState("grid");
    const [posts, setPosts] = useState([]);

    // Create a rotating animation value
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fn_getPosts();

        // Start the rotation animation
        startRotation();
    }, []);

    // Function to continuously rotate the hourglass
    const startRotation = () => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 5000, // 2 seconds for a full rotation
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();
    };

    // Create interpolation for rotation
    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const fn_getPosts = async () => {
        const response = await fn_getPostsByIDApi();
        if (response?.status) {
            setPosts(response?.data);
        };
    };

    // Component for the empty state with rotating hourglass
    const EmptyStateComponent = () => (
        <View style={{ marginTop: 40 }}>
            <Animated.View style={{ transform: [{ rotate: spin }], alignSelf: 'center' }}>
                <MaterialIcons
                    name="hourglass-empty"
                    size={50}
                    style={{ textAlign: "center", color: colors.mainColor }}
                />
            </Animated.View>
            <Text style={{ fontWeight: 500, marginTop: 10, textAlign: "center", color: colors.darkGray }}>No Discount Found</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Home"} />
            <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={BrandsHomeListStyle.sec}>
                    <View style={BrandsHomeListStyle.tabs}>
                        <TouchableOpacity activeOpacity={0.8} style={{ ...BrandsHomeListStyle.tab, borderBottomColor: tab === "grid" ? colors.mainColor : colors.lightMainColor }} onPress={() => setTab("grid")}>
                            {tab === "grid" ? (
                                <Ionicons name="grid" size={23} style={{ color: colors.mainColor }} />
                            ) : (
                                <Ionicons name="grid-outline" size={23} style={{ color: colors.lightMainColor }} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={{ ...BrandsHomeListStyle.tab, borderBottomColor: tab === "list" ? colors.mainColor : colors.lightMainColor }} onPress={() => setTab("list")}>
                            {tab === "list" ? (
                                <FontAwesome6 name="list-ul" size={23} style={{ color: colors.mainColor }} />
                            ) : (
                                <FontAwesome6 name="list-ul" size={23} style={{ color: colors.lightMainColor }} />
                            )}
                        </TouchableOpacity>
                    </View>
                    {tab === "grid" && (
                        posts.length > 0 ? (
                            <BrandsGridList data={posts} />
                        ) : (
                            <EmptyStateComponent />
                        )
                    )}
                    {tab === "list" && (
                        posts.length > 0 ? (
                            <BrandPostListView data={posts} fn_getPosts={fn_getPosts} />
                        ) : (
                            <EmptyStateComponent />
                        )
                    )}
                </View>
            </ScrollView>
            <BrandsBottomBar />
        </View>
    );
};

export default BrandsHome;