import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { BrandsHomeStyle, colors, MenuStyle, SingleDiscountStyle, Variables } from "../../../style/style";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";

import RoundLoader from "../../../components/RoundLoader";

import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

const SingleDiscountDetails = () => {


    const [loader, setLoader] = useState(false);
    const [description, setDescription] = useState("");
    const [uploadType, setUploadType] = useState("immediate");

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) setSelectedDate(date.toDateString());
    };

    const handleTimeChange = (event, time) => {
        setShowTimePicker(false);
        if (time) {
            const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setSelectedTime(formattedTime);
        }
    };

    const handleEndDateChange = (event, date) => {
        setShowEndDatePicker(false);
        if (date) setEndDate(date.toDateString());
    };

    const handleEndTimeChange = (event, time) => {
        setShowEndTimePicker(false);
        if (time) {
            const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setEndTime(formattedTime);
        }
    };

    return (
        <>
            {loader && <RoundLoader />}
            <View style={{ flex: 1 }}>
                <TopBar text={"Discount Details"} />
                <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                    <View style={BrandsHomeStyle.sec}>
                        {/* =========== images ============ */}
                        <View style={SingleDiscountStyle.imagesWrapper}>
                            <View style={SingleDiscountStyle.largeImageArea}>
                                <Feather name="upload" size={40} style={{ color: colors.mainColor, textAlign: 'center' }} />
                                <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 500, color: colors.mainColor }}>Upload Discount</Text>
                            </View>
                            <View style={{ gap: 8 }}>
                                <View style={SingleDiscountStyle.smallImageArea}>
                                    <AntDesign name='plus' size={27} style={{ textAlign: 'center', color: colors.mainColor }} />
                                </View>
                            </View>
                        </View>
                        <Text style={{ fontSize: 11, fontWeight: 500, marginTop: -7, color: colors.mainColor }}>(Max 5 images)</Text>

                        {/* =========== seperator ============ */}
                        <View style={{ ...SingleDiscountStyle.seperator, marginTop: 5 }}></View>

                        {/* =========== start date & time ============ */}
                        <Text style={{ fontSize: 16, fontWeight: 700, color: colors.mainColor, marginTop: 3 }}>Start Date & Time</Text>
                        <View style={{ gap: 10, flexDirection: 'row' }}>
                            <TouchableOpacity activeOpacity={0.5} style={uploadType === 'immediate' ? SingleDiscountStyle.activeButton : SingleDiscountStyle.inactiveButton} onPress={() => setUploadType('immediate')}>
                                <Text style={uploadType === 'immediate' ? SingleDiscountStyle.activeButtonText : SingleDiscountStyle.inactiveButtonText}>Immediately</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} style={uploadType === 'set' ? SingleDiscountStyle.activeButton : SingleDiscountStyle.inactiveButton} onPress={() => setUploadType('set')}>
                                <Text style={uploadType === 'set' ? SingleDiscountStyle.activeButtonText : SingleDiscountStyle.inactiveButtonText}>Set Date & Time</Text>
                            </TouchableOpacity>
                        </View>
                        {uploadType === 'set' && (
                            <View>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ marginBottom: 5, position: "relative" }}>
                                    <Text style={{ color: colors.darkGray, fontSize: 14, fontWeight: 500 }}>
                                        Start Date:
                                    </Text>
                                    <Text style={{ color: colors.darkGray, fontSize: 14, position: "absolute", left: "40%", fontStyle: selectedDate ? "normal" : "italic", color: selectedDate ? colors.mainColor : colors.darkGray, fontWeight: selectedDate ? "500" : "400" }}>
                                        {selectedDate || "Click to Select"}
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
                                <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{ position: "relative" }}>
                                    <Text style={{ color: colors.darkGray, fontSize: 14, fontWeight: 500 }}>
                                        Start Time:
                                    </Text>
                                    <Text style={{ color: colors.darkGray, fontSize: 14, position: "absolute", left: "40%", fontStyle: selectedTime ? "normal" : "italic", color: selectedTime ? colors.mainColor : colors.darkGray, fontWeight: selectedTime ? "500" : "400" }}>
                                        {selectedTime || "Click to Select"}
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

                        {/* =========== seperator ============ */}
                        <View style={{ ...SingleDiscountStyle.seperator, marginTop: 5 }}></View>

                        {/* =========== end date & time ============ */}
                        <Text style={{ fontSize: 16, fontWeight: 700, color: colors.mainColor, marginTop: 3 }}>Closed Date & Time</Text>
                        <View>
                            <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={{ marginBottom: 5, position: "relative" }}>
                                <Text style={{ color: colors.darkGray, fontSize: 14, fontWeight: 500 }}>
                                    End Date:
                                </Text>
                                <Text style={{ color: colors.darkGray, fontSize: 14, position: "absolute", left: "40%", fontStyle: endDate ? "normal" : "italic", color: endDate ? colors.mainColor : colors.darkGray, fontWeight: endDate ? "500" : "400" }}>
                                    {endDate || "Click to Select"}
                                </Text>
                            </TouchableOpacity>
                            {showEndDatePicker && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="date"
                                    display={Platform.OS === "ios" ? "inline" : "default"}
                                    onChange={handleEndDateChange}
                                />
                            )}
                            <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={{ position: "relative" }}>
                                <Text style={{ color: colors.darkGray, fontSize: 14, fontWeight: 500 }}>
                                    End Time:
                                </Text>
                                <Text style={{ color: colors.darkGray, fontSize: 14, position: "absolute", left: "40%", fontStyle: endTime ? "normal" : "italic", color: endTime ? colors.mainColor : colors.darkGray, fontWeight: endTime ? "500" : "400" }}>
                                    {endTime || "Click to Select"}
                                </Text>
                            </TouchableOpacity>
                            {showEndTimePicker && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="time"
                                    display={Platform.OS === "ios" ? "spinner" : "default"}
                                    onChange={handleEndTimeChange}
                                />
                            )}
                        </View>

                        {/* =========== seperator ============ */}
                        <View style={{ ...SingleDiscountStyle.seperator, marginTop: 5 }}></View>

                        {/* =========== description ============ */}
                        <Text style={{ fontSize: 16, fontWeight: 700, color: colors.mainColor, marginTop: 3 }}>Description</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={10}
                            value={description}
                            placeholder="Enter description here..."
                            onChangeText={(text) => setDescription(text)}
                            style={{ height: 100, borderColor: colors.lightMainColor3, borderWidth: 1, borderRadius: 5, padding: 10, textAlignVertical: 'top' }}
                        />

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={BrandsHomeStyle.bottomButton}
                        >
                            <Feather name="upload" size={19} style={MenuStyle.bottomButtonIcon} />
                            <Text style={MenuStyle.bottomButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <BrandsBottomBar />
            </View>
        </>
    )
}

export default SingleDiscountDetails;