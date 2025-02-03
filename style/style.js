import { StyleSheet } from "react-native";

export const capitalizeText = (text) => {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

export const formatRelativeTime = (dateString) => {
    // Parse the input date string
    const date = new Date(dateString);
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffMs = now - date;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    // Handle invalid date
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    // Just now - within the last minute
    if (diffSeconds < 60) {
        return 'just now';
    }

    // Minutes
    if (diffMinutes < 60) {
        return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
    }

    // Hours
    if (diffHours < 24) {
        return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    }

    // Days
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
};

export const colors = {
    mainColor: "#563392",
    secColor: "#563392",
    lightMainColor: "rgba(172, 155, 201, 0.6)",
    lightMainColor2: "rgba(86, 51, 146, 0.8)",
    white: "#ffffff",
    gray: "#EBEBEB",
    black: "#000000",
    blackOpacity: "rgba(0,0,0,0.7)",
    transparent: "transparent",
    darkGray: "#535353",
    link: "#007FFF"
};

export const Variables = {
    TopBarHeight: 60,
    BottombarHeight: 60,
    ScreenBottomPadding: 120
}

export const SplashScreenStyle = StyleSheet.create({
    logoCircle: {
        height: 120,
        width: 120,
        backgroundColor: colors.white,
        borderRadius: 100,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center"
    }
});

export const BottomBarStyle = StyleSheet.create({
    main: {
        position: 'absolute',
        bottom: 4,
        width: '100%',
        minHeight: Variables.BottombarHeight,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
    },
    sec: {
        width: '85%',
        borderRadius: Variables.BottombarHeight,
        minHeight: Variables.BottombarHeight,
        borderWidth: 1,
        borderColor: colors.white,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
    },
    icon: {
        color: colors.white,
        fontSize: 25,
        height: "100%",
        textAlignVertical: "center",
        width: 40,
        textAlign: "center"
    },
    activeIcon: {
        color: colors.mainColor,
        backgroundColor: colors.white,
        textAlign: "center",
        textAlignVertical: "center",
        borderRadius: 25,
        padding: 5,
        fontSize: 25,
        height: 40,
        width: 40
    }
});

export const TopBarStyle = StyleSheet.create({
    main: {
        position: "absolute",
        top: 0,
        width: "100%",
        minHeight: Variables.TopBarHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99
    },
    sec: {
        width: "100%",
        minHeight: Variables.TopBarHeight,
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        gap: 10
    },
    text: {
        color: colors.white,
        fontWeight: 500,
        fontSize: 18
    },
    icon: {
        color: colors.white,
        fontSize: 25
    }
})

export const HomeStyle = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Variables.TopBarHeight,
        width: "100%"
    },
    sec: {
        minHeight: 100,
        flex: 1,
        margin: 8,
        backgroundColor: colors.white,
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    searchBox: {
        backgroundColor: colors.gray,
        height: 50,
        width: '100%',
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        backgroundColor: colors.transparent,
        color: colors.black,
        fontSize: 15,
        marginRight: 5,
        fontWeight: 500
    },
    searchIcon: {
        color: colors.black,
        fontSize: 20,
    },
    featuredDiscount: {
        backgroundColor: colors.black,
        height: 150,
        borderRadius: 7,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    categoriesListHeading: {
        fontSize: 18,
        fontWeight: 700,
        color: colors.black
    },
    categoryBoxes: {
        gap: 5,
    },
    categoryBox: {
        width: 120,
        height: 120,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: colors.gray,
        position: "relative",
        overflow: "hidden"
    },
    categoryImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    categoryBoxTextView: {
        backgroundColor: colors.lightMainColor2,
        width: "100%",
        height: 19,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    categoryBoxText: {
        textAlign: "center",
        fontWeight: 700,
        fontSize: 13,
        color: colors.white
    }
})

export const SinglePostStyle = StyleSheet.create({
    main: {
        backgroundColor: colors.gray,
        minHeight: 100,
        borderRadius: 7,
        width: "100%",
        padding: 7,
        gap: 5
    },
    header: {
        minHeight: 30,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    headerImg: {
        width: 47,
        height: 47,
        backgroundColor: colors.black,
        borderRadius: 50,
        overflow: "hidden",
    },
    headerText: {
        fontSize: 16,
        fontWeight: 600,
        color: colors.black
    },
    post: {
        width: "100%",
        borderRadius: 7,
        backgroundColor: colors.black,
        height: 150,
        position: "relative",
        overflow: "hidden"
    },
    footer: {
        position: "relative",
        justifyContent: "center",
        height: 27
    },
    footerTime: {
        fontSize: 13,
        fontWeight: 600,
        color: colors.darkGray,
        textAlign: "right"
    },
    footerLikeButton: {
        position: "absolute",
        right: 0,
        fontSize: 27
    }
})

export const ProfileStyle = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Variables.TopBarHeight,
        width: "100%"
    },
    sec: {
        minHeight: 100,
        flex: 1,
        margin: 8,
        backgroundColor: colors.white,
        display: "flex",
        flexDirection: "column",
        gap: 8
    }
})

export const CategoriesStyle = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Variables.TopBarHeight,
        width: "100%"
    },
    sec: {
        minHeight: 100,
        flex: 1,
        margin: 8,
        backgroundColor: colors.white,
        display: "flex",
        flexDirection: "column",
        gap: 8
    }
})

export const SingleBrandStyle = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Variables.TopBarHeight,
        width: "100%",
        position: "relative"
    },
    bgDesign: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: colors.lightMainColor,
        height: 120,
        borderBottomRightRadius: 150,
        borderBottomLeftRadius: 150
    },
    sec: {
        minHeight: 100,
        flex: 1,
        margin: 8,
        backgroundColor: colors.transparent,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center"
    },
    profileImage: {
        height: 140,
        width: 140,
        backgroundColor: colors.white,
        borderRadius: 140,
        marginTop: 40,
        borderWidth: 4,
        borderColor: colors.mainColor,
        overflow: "hidden"
    },
    brandName: {
        fontSize: 23,
        fontWeight: 700,
        color: colors.mainColor,
        textAlign: "center"
    },
    locationText: {
        fontSize: 15,
        fontWeight: 500,
        textAlign: "center",
        maxWidth: "80%",
        color: colors.darkGray
    },
    locationIcon: {
        position: "absolute",
        left: -19,
        top: -1,
        color: colors.mainColor
    },
    mapViewText: {
        fontSize: 15,
        fontWeight: 500,
        color: colors.link,
        textDecorationLine: "underline"
    },
    seperator: {
        width: "70%",
        borderWidth: 0.3,
        borderColor: colors.lightMainColor,
        marginVertical: 10
    }
})

export const BrandsDrawerStyle = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    drawerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginHorizontal: 8,
        marginTop: 100,
        height: "85%"
    },
    drawerContent: {
        flex: 1,
        padding: 8,
        gap: 8,
        position: "relative"
    },
    heading: {
        backgroundColor: colors.mainColor,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    headingText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 600
    },
    searchBox: {
        backgroundColor: colors.gray,
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 13,
        color: colors.black,
        fontWeight: 500,
        width: "100%"
    },
    searchIcon: {
        position: "absolute",
        top: 12,
        right: 10,
        width: 14,
        height: 14
    },
    brandsList: {
        flex: 1
    },
    singleBrand: {
        backgroundColor: colors.gray,
        height: 60,
        borderRadius: 10,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 10,
        position: "relative"
    },
    brandImage: {
        width: 44,
        height: 44,
        borderRadius: 40,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.lightMainColor,
        overflow: "hidden"
    },
    brandName: {
        fontSize: 16,
        fontWeight: 700,
        color: colors.black
    },
    latestPostText: {
        position: "absolute",
        right: 7,
        bottom: 5,
        fontSize: 12,
        fontWeight: 500,
        color: colors.darkGray,
        fontStyle: "italic"
    }
})

export const BrandsListStyle = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: 700,
        color: colors.black
    },
    singleBrand: {
        backgroundColor: colors.gray,
        borderRadius: 7,
        paddingHorizontal: 10,
        minHeight: 90,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        position: "relative",
        paddingVertical: 7
    },
    singleBrandImage: {
        width: 70,
        height: 70,
        borderRadius: 70,
        overflow: "hidden",
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.lightMainColor,
    },
    singleBrandText: {
        fontSize: 17,
        fontWeight: 700,
        color: colors.black
    },
    singleBrandLocation: {
        fontSize: 11,
        fontWeight: 500,
        color: colors.darkGray
    },
    latestDiscountText: {
        position: "absolute",
        right: 11,
        top: 7,
        fontSize: 10,
        fontWeight: 500,
        color: colors.mainColor,
        fontStyle: "italic"
    }
})

export const MenuStyle = StyleSheet.create({
    main: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        backgroundColor: colors.blackOpacity,
        height: "100%",
        zIndex: 9999
    },
    sec: {
        position: "absolute",
        top: 0,
        width: 280,
        height: "100%",
        backgroundColor: colors.white,
        justifyContent: "space-between"
    },
    topArea: {
        height: 70,
        width: "100%",
        borderBottomColor: colors.darkGray,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20
    },
    midArea: {
        flex: 1,
        width: "100%",
        backgroundColor: colors.gray,
    },
    bottomArea: {
        height: 70,
        width: "100%",
        borderTopColor: colors.darkGray,
        borderTopWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomButton: {
        width: "80%",
        height: 50,
        borderRadius: 10,
        backgroundColor: colors.mainColor,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 8
    },
    bottomButtonIcon: {
        color: colors.white,
    },
    bottomButtonText: {
        color: colors.white,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 600
    },
    topCrossIcon: {
        backgroundColor: colors.gray,
        color: colors.black,
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    }
})

export const BrandsSignupStyle = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.white
    },
    sec: {
        flex: 1,
        marginHorizontal: 25,
        paddingVertical: 30,
        backgroundColor: colors.white,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        justifyContent: "center"
    },
    logoView: {
        alignItems: "center",
    },
    uploadLogoView: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 8
    },
    uploadLogoCircle: {
        width: 130,
        height: 130,
        borderRadius: 130,
        backgroundColor: colors.gray,
        borderColor: colors.mainColor,
        borderWidth: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    BrandLogoText: {
        fontSize: 15,
        fontWeight: 600
    },
    inputBoxMain: {
        gap: 3
    },
    textInput: {
        borderColor: colors.lightMainColor,
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 14,
        color: colors.black,
        fontWeight: 500
    },
    button: {
        backgroundColor: colors.mainColor,
        height: 55,
        borderRadius: 10,
        justifyContent: "center"
    }
})