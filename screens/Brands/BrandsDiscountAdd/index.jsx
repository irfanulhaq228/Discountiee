import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView, Text, View, Image, TouchableOpacity, Switch } from "react-native";

import { BrandsHomeStyle, colors, HomeStyle, Variables } from "../../../style/style";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";

const BrandsDiscountAdd = ({ mode, setMode, showMenu, setShowMenu }) => {

    const [image, setImage] = useState(null);
    const [isScheduled, setIsScheduled] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleImageUpload = () => {
        // Logic to upload image and set the image URI
        // setImage(uri);
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) setSelectedDate(date.toDateString());
    };

    const handleTimeChange = (event, time) => {
        setShowTimePicker(false);
        if (time) setSelectedTime(time.toLocaleTimeString());
    };

    const toggleSchedule = (value) => {
        setIsScheduled(value);
        if (!value) {
            setSelectedDate(null);
            setSelectedTime(null);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Add Discount"} showMenu={showMenu} setShowMenu={setShowMenu} setMode={setMode} mode={mode} />
            <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={BrandsHomeStyle.sec}>
                    <View style={BrandsHomeStyle.formBox}>
                        <Text style={HomeStyle.categoriesListHeading}>Upload Discount Image</Text>
                        <TouchableOpacity onPress={handleImageUpload} style={{ width: '100%', height: 150, borderRadius: 7, borderWidth: 1, borderColor: colors.darkGray, justifyContent: 'center', alignItems: 'center' }}>
                            {image ? (
                                <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
                            ) : (
                                <View style={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Ionicons name="image-outline" style={{ fontSize: 27, color: colors.darkGray }} />
                                    <Text style={{ color: colors.darkGray, fontSize: 15, fontStyle: "italic" }}>Upload Discount Image</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={BrandsHomeStyle.formBox}>
                        <View style={{ position: "relative" }}>
                            <Text style={HomeStyle.categoriesListHeading}>Schedule Discount Time</Text>
                            <Switch
                                value={isScheduled}
                                onValueChange={setIsScheduled}
                                style={{ position: "absolute", right: -5, top: 2 }}
                            />
                        </View>
                        {isScheduled && (
                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ marginBottom: 10, position: "relative" }}>
                                    <Text style={{ color: colors.darkGray, fontSize: 15 }}>
                                        Select Date:
                                    </Text>
                                    <Text style={{ color: colors.darkGray, fontSize: 15, position: "absolute", left: "40%", fontStyle: selectedDate ? "normal" : "italic", color: selectedTime ? colors.black : colors.darkGray, fontWeight: selectedDate ? "500" : "400" }}>
                                        {selectedDate || "Not selected"}
                                    </Text>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={new Date()}
                                        mode="date"
                                        display={Platform.OS === "ios" ? "inline" : "default"}
                                        onChange={handleDateChange}
                                    />
                                )}
                                <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{ marginBottom: 10, position: "relative" }}>
                                    <Text style={{ color: colors.darkGray, fontSize: 15 }}>
                                        Select Time:
                                    </Text>
                                    <Text style={{ color: colors.darkGray, fontSize: 15, position: "absolute", left: "40%", fontStyle: selectedTime ? "normal" : "italic", color: selectedTime ? colors.black : colors.darkGray, fontWeight: selectedTime ? "500" : "400" }}>
                                        {selectedTime || "Not selected"}
                                    </Text>
                                </TouchableOpacity>
                                {showTimePicker && (
                                    <DateTimePicker
                                        value={new Date()}
                                        mode="time"
                                        display={Platform.OS === "ios" ? "spinner" : "default"}
                                        onChange={handleTimeChange}
                                    />
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            <BrandsBottomBar />
        </View>
    )
}

export default BrandsDiscountAdd;