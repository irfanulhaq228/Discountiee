import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useToast } from "react-native-toast-notifications";
import { launchImageLibrary } from "react-native-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, Text, View, Image, TouchableOpacity, Switch, TextInput } from "react-native";

import { fn_createPostApi } from "../../../api/api";
import { BrandsHomeStyle, colors, HomeStyle, MenuStyle, Variables } from "../../../style/style";

import TopBar from "../../../components/TopBar";
import BrandsBottomBar from "../../../components/BrandsBottomBar";

import Feather from "react-native-vector-icons/Feather";
import RoundLoader from "../../../components/RoundLoader";

const BrandsDiscountAdd = () => {

    const toast = useToast();
    const navigation = useNavigation();
    const [images, setImages] = useState([]);
    const [loader, setLoader] = useState(false);
    const [description, setDescription] = useState("");
    const [isScheduled, setIsScheduled] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const handleImageUpload = async () => {
        if (images.length >= 10) return;
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

    const handleUpload = async () => {
        if (images.length === 0) {
            toast.show("❗ Please upload at least one image");
            return;
        }
        if (!endDate || !endTime) {
            toast.show("❗ Please select discount end date and time");
            return;
        }
        if (isScheduled && (!selectedDate || !selectedTime)) {
            toast.show("❗ Please select upload date and time");
            return;
        }
        if (!description) {
            toast.show("❗ Please enter a description");
            return;
        };

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
        };

        formData.append('description', description);
        formData.append('endDate', endDate);
        formData.append('endTime', endTime);
        formData.append('uploadDate', isScheduled ? selectedDate : '');
        formData.append('uploadTime', isScheduled ? selectedTime : '');
        formData.append('immediately', !isScheduled);
        setLoader(true);
        toast.hideAll();
        const response = await fn_createPostApi(formData);
        setLoader(false);
        if (response?.status) {
            toast.show(response?.message);
            navigation.navigate("BrandsHome");
        } else {
            toast.show(response?.message)
        }
    };

    return (
        <>
            {loader && <RoundLoader />}
            <View style={{ flex: 1 }}>
                <TopBar text={"Add Discount"} />
                <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                    <View style={BrandsHomeStyle.sec}>
                        {/* ======================== upload images ======================== */}
                        <View style={BrandsHomeStyle.formBox}>
                            <Text style={HomeStyle.categoriesListHeading}>
                                Upload Discount Images <Text style={{ fontSize: 12, color: colors.darkGray }}>(max 10 images)</Text>
                            </Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {images.map((image, index) => (
                                    <View
                                        key={index}
                                        style={{ position: "relative", width: "30%", aspectRatio: 1, margin: "1.66%", borderWidth: 1, borderColor: colors.gray, borderRadius: 10 }}
                                    >
                                        <Image source={{ uri: image }} style={{ width: "100%", height: "100%", borderRadius: 5 }} />
                                        <TouchableOpacity
                                            onPress={() => handleRemoveImage(index)}
                                            style={{ position: "absolute", top: -5, right: -5, backgroundColor: colors.red, borderRadius: 10, padding: 5 }}
                                        >
                                            <Ionicons name="close" size={15} color={colors.white} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                {images.length < 10 && (
                                    <TouchableOpacity
                                        onPress={handleImageUpload}
                                        style={{ width: "30%", height: 120, aspectRatio: 1, margin: "1.66%", borderRadius: 7, borderWidth: 1, borderColor: colors.darkGray, justifyContent: "center", alignItems: "center" }}
                                    >
                                        <View style={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <Ionicons name="image-outline" style={{ fontSize: 27, color: colors.darkGray }} />
                                            <Text style={{ color: colors.darkGray, fontSize: 15, fontStyle: "italic" }}>Upload</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        {/* ======================== schedulr upload time ======================== */}
                        <View style={BrandsHomeStyle.formBox}>
                            <View style={{ position: "relative" }}>
                                <Text style={HomeStyle.categoriesListHeading}>Schedule Upload Time</Text>
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
                                            Upload Date:
                                        </Text>
                                        <Text style={{ color: colors.darkGray, fontSize: 15, position: "absolute", left: "40%", fontStyle: selectedDate ? "normal" : "italic", color: selectedTime ? colors.black : colors.darkGray, fontWeight: selectedDate ? "500" : "400" }}>
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
                                    <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{ marginBottom: 10, position: "relative" }}>
                                        <Text style={{ color: colors.darkGray, fontSize: 15 }}>
                                            Upload Time:
                                        </Text>
                                        <Text style={{ color: colors.darkGray, fontSize: 15, position: "absolute", left: "40%", fontStyle: selectedTime ? "normal" : "italic", color: selectedTime ? colors.black : colors.darkGray, fontWeight: selectedTime ? "500" : "400" }}>
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
                        </View>
                        {/* ======================== discount end time ======================== */}
                        <View style={BrandsHomeStyle.formBox}>
                            <Text style={HomeStyle.categoriesListHeading}>Discount End Time</Text>
                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={{ marginBottom: 10, position: "relative" }}>
                                    <Text style={{ color: colors.darkGray, fontSize: 15 }}>
                                        End Date:
                                    </Text>
                                    <Text style={{ color: colors.darkGray, fontSize: 15, position: "absolute", left: "40%", fontStyle: endDate ? "normal" : "italic", color: endDate ? colors.black : colors.darkGray, fontWeight: endDate ? "500" : "400" }}>
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
                                <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={{ marginBottom: 10, position: "relative" }}>
                                    <Text style={{ color: colors.darkGray, fontSize: 15 }}>
                                        End Time:
                                    </Text>
                                    <Text style={{ color: colors.darkGray, fontSize: 15, position: "absolute", left: "40%", fontStyle: endTime ? "normal" : "italic", color: endTime ? colors.black : colors.darkGray, fontWeight: endTime ? "500" : "400" }}>
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
                        </View>
                        {/* ======================== description ======================== */}
                        <View style={BrandsHomeStyle.formBox}>
                            <Text style={HomeStyle.categoriesListHeading}>Description</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={10}
                                value={description}
                                placeholder="Enter description here..."
                                onChangeText={(text) => setDescription(text)}
                                style={{ height: 100, borderColor: colors.darkGray, borderWidth: 1, borderRadius: 5, padding: 10, textAlignVertical: 'top' }}
                            />
                        </View>
                        {/* ======================== button ======================== */}
                        <View style={BrandsHomeStyle.formBox}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={BrandsHomeStyle.bottomButton}
                                onPress={handleUpload}
                            >
                                <Feather name="upload" size={19} style={MenuStyle.bottomButtonIcon} />
                                <Text style={MenuStyle.bottomButtonText}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <BrandsBottomBar />
            </View>
        </>
    )
}

export default BrandsDiscountAdd;