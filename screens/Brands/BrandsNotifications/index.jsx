import { ScrollView, Text, View } from "react-native";

import { BrandsHomeStyle, BrandsNotificationStyle, colors, Variables } from "../../../style/style";

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";

const BrandsNotifications = () => {
    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"My Notifications"} />
            <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={BrandsNotificationStyle.sec}>
                    <Notification heading={"Post Liked"} text={"Wow, Your discount is liked by 24 peoples, Click to view details."} time={"1 mint ago"} icon={<AntDesign name="heart" size={26} style={{ color: colors.white, textAlign: "center", marginTop: 2 }} />} read={false} />
                    <Notification heading={"New Discount Added"} text={"New  discount have been added in your  list, Wish you best of luck."} time={"1 hour ago"} icon={<MaterialCommunityIcons name="upload" size={32} style={{ color: colors.white, textAlign: "center" }} />} read={true} />
                    <Notification heading={"Discount Expired"} text={"Your discount reachs to its expired time, Click to view details."} time={"14 hours ago"} icon={<Ionicons name="timer" size={32} style={{ color: colors.white, textAlign: "center" }} />} read={false} />
                    <Notification heading={"Discount Deleted"} text={"You deleted your discount, you can restore it within 30 days."} time={"1 day ago"} icon={<MaterialCommunityIcons name="delete-outline" size={30} style={{ color: colors.white, textAlign: "center" }} />} read={false} />
                    <Notification heading={"Post Liked"} text={"Wow, Your discount is liked by 24 peoples, Click to view details."} time={"3 days ago"} icon={<AntDesign name="heart" size={26} style={{ color: colors.white, textAlign: "center", marginTop: 2 }} />} read={true} />
                    <Notification heading={"New Discount Added"} text={"New  discount have been added in your  list, Wish you best of luck."} time={"15 days ago"} icon={<MaterialCommunityIcons name="upload" size={32} style={{ color: colors.white, textAlign: "center" }} />} read={true} />
                    <Notification heading={"Discount Expired"} text={"Your discount reachs to its expired time, Click to view details."} time={"1 month ago"} icon={<Ionicons name="timer" size={32} style={{ color: colors.white, textAlign: "center" }} />} read={true} />
                    <Notification heading={"Discount Deleted"} text={"You deleted your discount, you can restore it within 30 days."} time={"7 months ago"} icon={<MaterialCommunityIcons name="delete-outline" size={30} style={{ color: colors.white, textAlign: "center" }} />} read={true} />
                    <Notification heading={"Post Liked"} text={"Wow, Your discount is liked by 24 peoples, Click to view details."} time={"1 year ago"} icon={<AntDesign name="heart" size={26} style={{ color: colors.white, textAlign: "center", marginTop: 2 }} />} read={true} />
                    <Notification heading={"New Discount Added"} text={"New  discount have been added in your  list, Wish you best of luck."} time={"2 years ago"} icon={<MaterialCommunityIcons name="upload" size={32} style={{ color: colors.white, textAlign: "center" }} />} read={true} />
                    <Notification heading={"Discount Expired"} text={"Your discount reachs to its expired time, Click to view details."} time={"4 years ago"} icon={<Ionicons name="timer" size={32} style={{ color: colors.white, textAlign: "center" }} />} read={true} />
                    <Notification heading={"Discount Deleted"} text={"You deleted your discount, you can restore it within 30 days."} time={"7 years ago"} icon={<MaterialCommunityIcons name="delete-outline" size={30} style={{ color: colors.white, textAlign: "center" }} />} read={true} />
                </View>
            </ScrollView>
            <BrandsBottomBar />
        </View>
    )
}

export default BrandsNotifications;

const Notification = ({ heading, time, text, icon, read }) => {
    return (
        <View style={{ ...BrandsNotificationStyle.notification, backgroundColor: read ? colors.lightBlack2 : colors.lightMainColor3 }}>
            <View style={BrandsNotificationStyle.image}>
                {icon}
            </View>
            <View style={BrandsNotificationStyle.textBox}>
                <Text style={BrandsNotificationStyle.notificationHeading}>{heading}</Text>
                <Text style={BrandsNotificationStyle.notificationText}>
                    {text}
                </Text>
                <Text style={BrandsNotificationStyle.notificationTime}>
                    {time}
                </Text>
            </View>
        </View>
    )
}