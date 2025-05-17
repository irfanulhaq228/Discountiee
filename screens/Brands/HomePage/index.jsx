import { Skeleton } from '@rneui/themed';
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { fn_getPostsByIDApi } from "../../../api/api";
import BrandsGridList from "../../../components/BrandsGridList";
import { BrandsHomeListStyle, BrandsHomeStyle, colors, Variables } from "../../../style/style";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";
import BrandPostListView from "../../../components/BrandPostListView";
import LinearGradient from 'react-native-linear-gradient';
import RoundLoader from '../../../components/RoundLoader';

const BrandsHome = () => {
    const [tab, setTab] = useState("grid");
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(false);
    const [updateLoader, setUpdateLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        fn_getPosts();
    }, []);

    const fn_getPosts = async () => {
        const response = await fn_getPostsByIDApi();
        setTimeout(() => {
            setLoader(false);
        }, 1000);
        if (response?.status) {
            setPosts(response?.data);
        } else {
            setPosts([]);
        };
    };

    const EmptyStateComponent = () => (
        <View style={{ marginTop: 40 }}>
            <MaterialIcons
                name="hourglass-empty"
                size={50}
                style={{ textAlign: "center", color: colors.mainColor }}
            />
            <Text style={{ fontWeight: 500, marginTop: 10, textAlign: "center", color: colors.darkGray }}>No Discount Found</Text>
        </View>
    );

    return (
        <>
            {updateLoader && <RoundLoader />}
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
                        {loader ? (
                            <View style={BrandsHomeListStyle.gridMain}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                                    <View key={index} style={BrandsHomeListStyle.gridSingleBox}>
                                        <Skeleton
                                            LinearGradientComponent={LinearGradient}
                                            linearGradientProps={{
                                                colors: ['#f2f2f2', '#fafafa', '#f2f2f2'],
                                                start: { x: 0, y: 0 },
                                                end: { x: 1, y: 0 },
                                            }}
                                            animation="wave"
                                            width="100%"
                                            height="100%"
                                        />
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <>
                                {tab === "grid" && (
                                    posts.length > 0 ? (
                                        <BrandsGridList data={posts} />
                                    ) : (
                                        <EmptyStateComponent />
                                    )
                                )}
                                {tab === "list" && (
                                    posts.length > 0 ? (
                                        <BrandPostListView data={posts} fn_getPosts={fn_getPosts} setUpdateLoader={setUpdateLoader} />
                                    ) : (
                                        <EmptyStateComponent />
                                    )
                                )}
                            </>
                        )}
                    </View>
                </ScrollView>
                <BrandsBottomBar />
            </View>
        </>
    );
};

export default BrandsHome;