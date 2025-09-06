import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import TopBar from '../../../components/TopBar';
import BrandsBottomBar from '../../../components/BrandsBottomBar';
import { BrandsHomeStyle, SingleBrandStyle, Variables } from '../../../style/style';

const PrivacyPolicy = () => {

    return (
        <View style={{ flex: 1 }}>
            <TopBar text={"Privacy Policy"} />
            <ScrollView style={BrandsHomeStyle.main} contentContainerStyle={{ paddingBottom: Variables.ScreenBottomPadding }}>
                <View style={SingleBrandStyle.sec}>
                    <View style={{ padding: 20 }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            textAlign: 'center',
                            color: '#333'
                        }}>
                            Privacy Policy
                        </Text>

                        <Text style={{
                            fontSize: 12,
                            color: '#666',
                            marginBottom: 20,
                            textAlign: 'center'
                        }}>
                            Last updated: {new Date().toLocaleDateString()}
                        </Text>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 10,
                                color: '#333'
                            }}>
                                1. Information We Collect
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                lineHeight: 20,
                                marginBottom: 15,
                                color: '#555'
                            }}>
                                We collect information you provide directly to us, such as when you create an account,
                                upload discount posts, or contact us for support. This may include your name, email address,
                                business information, and any content you choose to share.
                            </Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 10,
                                color: '#333'
                            }}>
                                2. How We Use Your Information
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                lineHeight: 20,
                                marginBottom: 15,
                                color: '#555'
                            }}>
                                We use the information we collect to provide, maintain, and improve our services,
                                process your discount posts, communicate with you, and ensure the security of our platform.
                            </Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 10,
                                color: '#333'
                            }}>
                                3. Information Sharing
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                lineHeight: 20,
                                marginBottom: 15,
                                color: '#555'
                            }}>
                                We do not sell, trade, or otherwise transfer your personal information to third parties
                                without your consent, except as described in this privacy policy or as required by law.
                            </Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 10,
                                color: '#333'
                            }}>
                                4. Data Security
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                lineHeight: 20,
                                marginBottom: 15,
                                color: '#555'
                            }}>
                                We implement appropriate security measures to protect your personal information against
                                unauthorized access, alteration, disclosure, or destruction.
                            </Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 10,
                                color: '#333'
                            }}>
                                5. Your Rights
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                lineHeight: 20,
                                marginBottom: 15,
                                color: '#555'
                            }}>
                                You have the right to access, update, or delete your personal information. You may also
                                opt out of certain communications from us at any time.
                            </Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 10,
                                color: '#333'
                            }}>
                                6. Contact Us
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                lineHeight: 20,
                                marginBottom: 15,
                                color: '#555'
                            }}>
                                If you have any questions about this Privacy Policy, please contact us at
                                help.discountiee@gmail.com or through our support channels.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BrandsBottomBar />
        </View>
    );
};

export default PrivacyPolicy;
