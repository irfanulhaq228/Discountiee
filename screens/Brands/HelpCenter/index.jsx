import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import TopBar from '../../../components/TopBar';
import BrandsBottomBar from '../../../components/BrandsBottomBar';
import { BrandsHomeStyle, colors, SingleBrandStyle, Variables } from '../../../style/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HelpCenter = () => {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpanded = (itemId) => {
        setExpandedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const faqData = [
        {
            id: 1,
            question: "How do I create a discount post?",
            answer: "To create a discount post, go to Settings and tap on 'Add Discount'. Fill in the required information including discount details, upload date/time, and expiry date/time. Make sure to provide accurate information to help customers find your offers."
        },
        {
            id: 2,
            question: "How do I edit my profile information?",
            answer: "You can edit your profile by going to Settings and tapping on your profile picture. This will open a modal where you can update your business name, address, city, and other details. Don't forget to save your changes."
        },
        {
            id: 3,
            question: "How do I change my password?",
            answer: "In the Settings screen, tap on 'Change Password'. Enter your current password and then your new password twice to confirm. Make sure your new password is strong and secure."
        },
        {
            id: 4,
            question: "What if I forget my password?",
            answer: "If you forget your password, go to the Sign In screen and tap 'Forgot Password'. Enter your email address and follow the instructions sent to your email to reset your password."
        },
        {
            id: 5,
            question: "How do I view my posted discounts?",
            answer: "Your posted discounts are displayed on the main home screen. You can also view detailed information about each discount by tapping on it. This will show you all the details including views and engagement."
        },
        {
            id: 6,
            question: "Can I edit or delete my discount posts?",
            answer: "Currently, you can view your discount posts from the home screen. For editing or deleting posts, please contact our support team at help.discountiee@gmail.com for assistance."
        },
        {
            id: 7,
            question: "How do I contact support?",
            answer: "You can contact our support team by emailing help.discountiee@gmail.com. We typically respond within 24 hours. You can also reach out through our support channels mentioned in the app."
        },
        {
            id: 8,
            question: "What information do I need to provide for my business?",
            answer: "You need to provide your business name, logo, address, city, country, and select your business category. This information helps customers find and identify your business on the platform."
        }
    ];

    const contactInfo = [
        {
            icon: 'mail',
            title: 'Email Support',
            description: 'help.discountiee@gmail.com',
            subtitle: 'We respond within 24 hours'
        },
        {
            icon: 'time',
            title: 'Response Time',
            description: '24-48 hours',
            subtitle: 'Monday to Friday'
        },
        {
            icon: 'globe',
            title: 'Business Hours',
            description: '9 AM - 6 PM',
            subtitle: 'Pakistan Standard Time'
        }
    ];

    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Help Center"} />
            <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={SingleBrandStyle.sec}>
                    <View style={{ padding: 20 }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginBottom: 10,
                            textAlign: 'center',
                            color: '#333'
                        }}>
                            How can we help you?
                        </Text>

                        <Text style={{
                            fontSize: 14,
                            color: '#666',
                            marginBottom: 30,
                            textAlign: 'center'
                        }}>
                            Find answers to common questions or contact our support team
                        </Text>

                        {/* Contact Information */}
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 15,
                                color: '#333'
                            }}>
                                Contact Information
                            </Text>

                            {contactInfo.map((item, index) => (
                                <View key={index} style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 15,
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: 8,
                                    marginBottom: 10
                                }}>
                                    <View style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: colors.mainColor,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 15
                                    }}>
                                        <Ionicons name={item.icon} size={20} color="white" />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '600',
                                            color: '#333',
                                            marginBottom: 2
                                        }}>
                                            {item.title}
                                        </Text>
                                        <Text style={{
                                            fontSize: 13,
                                            color: colors.mainColor,
                                            marginBottom: 2
                                        }}>
                                            {item.description}
                                        </Text>
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#666'
                                        }}>
                                            {item.subtitle}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* FAQ Section */}
                        <View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 15,
                                color: '#333'
                            }}>
                                Frequently Asked Questions
                            </Text>

                            {faqData.map((item) => (
                                <View key={item.id} style={{
                                    backgroundColor: '#fff',
                                    borderRadius: 8,
                                    marginBottom: 10,
                                    borderWidth: 1,
                                    borderColor: '#e9ecef'
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            padding: 15,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                        onPress={() => toggleExpanded(item.id)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: '#333',
                                            flex: 1,
                                            marginRight: 10
                                        }}>
                                            {item.question}
                                        </Text>
                                        <AntDesign
                                            name={expandedItems[item.id] ? "up" : "down"}
                                            size={16}
                                            color="#666"
                                        />
                                    </TouchableOpacity>

                                    {expandedItems[item.id] && (
                                        <View style={{
                                            paddingHorizontal: 15,
                                            paddingBottom: 15,
                                            borderTopWidth: 1,
                                            borderTopColor: '#e9ecef'
                                        }}>
                                            <Text style={{
                                                fontSize: 13,
                                                lineHeight: 20,
                                                color: '#555'
                                            }}>
                                                {item.answer}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>

                        {/* Additional Help */}
                        <View style={{
                            marginTop: 30,
                            padding: 20,
                            backgroundColor: colors.lightMainColor5,
                            borderRadius: 8,
                            borderLeftWidth: 4,
                            borderLeftColor: colors.mainColor
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Ionicons name="information-circle" size={20} color={colors.mainColor} />
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: colors.mainColor,
                                    marginLeft: 8
                                }}>
                                    Still need help?
                                </Text>
                            </View>
                            <Text style={{
                                fontSize: 13,
                                color: colors.mainColor,
                                lineHeight: 18
                            }}>
                                If you can't find the answer you're looking for, don't hesitate to reach out to our support team. We're here to help you make the most of our platform.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BrandsBottomBar />
        </View>
    );
};

export default HelpCenter;
