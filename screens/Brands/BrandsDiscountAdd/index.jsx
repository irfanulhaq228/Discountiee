import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useToast } from "react-native-toast-notifications";
import { launchImageLibrary } from "react-native-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, Text, View, Image, TouchableOpacity, TextInput, Platform } from "react-native";

import { fn_createPostApi } from "../../../api/api";
import { BrandsHomeStyle, colors, MenuStyle, SingleDiscountStyle, Variables } from "../../../style/style";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";

import Feather from "react-native-vector-icons/Feather";
import RoundLoader from "../../../components/RoundLoader";
import AntDesign from "react-native-vector-icons/AntDesign";

const BrandsDiscountAdd = () => {

    const toast = useToast();
    const navigation = useNavigation();
    const [images, setImages] = useState([]);
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

    const handleImageUpload = async () => {
        if (images.length >= 10) {
            toast.show("❗ Maximum 10 images allowed");
            return;
        }
        const options = {
            mediaType: "photo",
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel || response.errorCode) return;
            if (response.assets && response.assets.length > 0) {
                setImages([...images, response.assets[0].uri]);
            }
        });
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        // Only update if user actually selected a date (not cancelled)
        if (event.type === 'set' && date) {
            setSelectedDate(date.toDateString());
        }
    };

    const handleTimeChange = (event, time) => {
        setShowTimePicker(false);
        // Only update if user actually selected a time (not cancelled)
        if (event.type === 'set' && time) {
            const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setSelectedTime(formattedTime);
        }
    };

    const handleEndDateChange = (event, date) => {
        setShowEndDatePicker(false);
        // Only update if user actually selected a date (not cancelled)
        if (event.type === 'set' && date) {
            setEndDate(date.toDateString());
        }
    };

    const handleEndTimeChange = (event, time) => {
        setShowEndTimePicker(false);
        // Only update if user actually selected a time (not cancelled)
        if (event.type === 'set' && time) {
            const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setEndTime(formattedTime);
        }
    };

    // Helper function to get the initial date value for date pickers
    const getInitialDateValue = (dateString) => {
        if (dateString) {
            return new Date(dateString);
        }
        return new Date();
    };

    // Helper function to get the initial time value for time pickers
    const getInitialTimeValue = (timeString) => {
        if (timeString) {
            const [hours, minutes] = timeString.split(':').map(Number);
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        }
        return new Date();
    };

    const handleCreate = async () => {
        if (images.length === 0) {
            toast.show("❗ Please upload at least one image");
            return;
        }
        if (!endDate || !endTime) {
            toast.show("❗ Please select discount end date and time");
            return;
        }
        if (uploadType === 'set' && (!selectedDate || !selectedTime)) {
            toast.show("❗ Please select upload date and time");
            return;
        }
        if (!description) {
            toast.show("❗ Please enter a description");
            return;
        }

        const formData = new FormData();

        images.forEach((uri, index) => {
            formData.append('images', {
                uri: uri,
                name: `image_${index}.jpg`,
                type: 'image/jpeg',
            });
        });

        const brandId = await AsyncStorage.getItem('id');
        if (brandId) {
            formData.append('brand', brandId);
        }

        formData.append('description', description);
        formData.append('endDate', endDate);
        formData.append('endTime', endTime);
        formData.append('uploadDate', uploadType === 'set' ? selectedDate : '');
        formData.append('uploadTime', uploadType === 'set' ? selectedTime : '');
        formData.append('immediately', uploadType === 'immediate');

        // Determine status based on start date/time and current time
        let status = 'pending';
        if (uploadType === 'immediate') {
            status = 'active';
        } else if (uploadType === 'set' && selectedDate && selectedTime) {
            // Create a Date object for the selected start date and time
            // Parse the date string properly
            const dateParts = selectedDate.split(' ');
            const timeParts = selectedTime.split(':');

            // Create a proper date object
            const startDateTime = new Date(
                parseInt(dateParts[3]), // year
                new Date(selectedDate).getMonth(), // month (0-11)
                parseInt(dateParts[2]), // day
                parseInt(timeParts[0]), // hour
                parseInt(timeParts[1])  // minute
            );

            const currentDateTime = new Date();

            // If start date and time is lower than current time, set status as active
            if (startDateTime <= currentDateTime) {
                status = 'active';
            }
        }

        formData.append('status', status);

        setLoader(true);
        toast.hideAll();

        const response = await fn_createPostApi(formData);
        setLoader(false);

        if (response?.status) {
            toast.show(response?.message);
            navigation.navigate("BrandsHome");
        } else {
            toast.show(response?.message);
        }
    };

    return (
        <>
            {loader && <RoundLoader />}
            <View style={{ flex: 1 }}>
                <TopBar text={"Add Discount"} />
                <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                    <View style={BrandsHomeStyle.sec}>
                        {/* =========== images ============ */}
                        <View style={SingleDiscountStyle.imagesWrapper}>
                            <View style={SingleDiscountStyle.largeImageArea}>
                                {images.length > 0 ? (
                                    <View style={{ position: 'relative', width: '100%', height: '100%', borderWidth: 1, borderColor: colors.mainColor, borderRadius: 10 }}>
                                        <Image
                                            source={{ uri: images[0] }}
                                            style={{ width: "100%", height: "100%", borderRadius: 10, objectFit: "cover" }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => handleRemoveImage(0)}
                                            style={{
                                                position: "absolute",
                                                top: 10,
                                                right: 10,
                                                backgroundColor: colors.red,
                                                borderRadius: 15,
                                                width: 30,
                                                height: 30,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,
                                                elevation: 5,
                                            }}
                                        >
                                            <Ionicons name="close" size={16} color={colors.white} />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        onPress={handleImageUpload}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderWidth: 2,
                                            borderColor: colors.mainColor,
                                            borderStyle: 'dashed',
                                            borderRadius: 10,
                                            backgroundColor: colors.lightMainColor5
                                        }}
                                    >
                                        <Feather name="upload" size={40} style={{ color: colors.mainColor, marginBottom: 8 }} />
                                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 500, color: colors.mainColor, marginBottom: 4 }}>Upload Image</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 12, color: colors.darkGray }}>Tap to select from gallery</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={{ gap: 8 }}>
                                {images.slice(1, 5).map((image, index) => (
                                    <View key={index + 1} style={SingleDiscountStyle.smallImageArea}>
                                        <Image
                                            source={{ uri: image }}
                                            style={{ width: "100%", height: "100%", borderRadius: 5, objectFit: "cover" }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => handleRemoveImage(index + 1)}
                                            style={{ position: "absolute", top: -5, right: -5, backgroundColor: colors.red, borderRadius: 10, padding: 3 }}
                                        >
                                            <Ionicons name="close" size={12} color={colors.white} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                {images.length < 10 && (
                                    <TouchableOpacity
                                        onPress={handleImageUpload}
                                        style={SingleDiscountStyle.smallImageArea}
                                    >
                                        <AntDesign name='plus' size={27} style={{ textAlign: 'center', color: colors.mainColor }} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <Text style={{ fontSize: 11, fontWeight: 500, marginTop: -7, color: colors.mainColor }}>(Max 10 images)</Text>

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
                                        value={getInitialDateValue(selectedDate)}
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
                                        value={getInitialTimeValue(selectedTime)}
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
                                    value={getInitialDateValue(endDate)}
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
                                    value={getInitialTimeValue(endTime)}
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
                            onPress={handleCreate}
                        >
                            <Feather name="upload" size={19} style={MenuStyle.bottomButtonIcon} />
                            <Text style={MenuStyle.bottomButtonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <BrandsBottomBar />
            </View>
        </>
    )
}

export default BrandsDiscountAdd;