import moment from 'moment';
import Modal from "react-native-modal";
import React, { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { Image, Switch, Text, View, TouchableOpacity } from 'react-native';

// import { API_URL } from '@env';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BrandPostListViewStyle, colors } from '../../style/style';
import { fn_updatePostStatusApi, fn_deletePostApi, API_URL } from '../../api/api';

const BrandPostListView = ({ data, fn_getPosts, setUpdateLoader }) => {

    const toast = useToast();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const fn_updateStatus = async (status, item) => {
        setUpdateLoader(true);
        toast.hideAll();
        const response = await fn_updatePostStatusApi(status, item._id);
        setUpdateLoader(false);
        if (response?.status) {
            toast.show("✅ Status Updated");
            fn_getPosts();
        } else {
            toast.show(`❌ ${response?.message}`);
        }
    };

    const fn_deletePost = async (id) => {
        setModalVisible(false);
        setUpdateLoader(true);
        toast.hideAll();
        const response = await fn_deletePostApi(id);
        setUpdateLoader(false);
        if (response?.status) {
            toast.show("✅ Discount Deleted");
            fn_getPosts();
        } else {
            toast.show(`${response?.message}`);
        }
    };

    return (
        <View style={BrandPostListViewStyle.listMain}>
            {data?.map((item, index) => (
                <View key={index} style={BrandPostListViewStyle.singleList}>
                    <Image source={{ uri: `${API_URL}/${item?.images?.[0]}` }} style={BrandPostListViewStyle.singleListPost} />
                    <View style={{ gap: 3, flex: 1 }}>
                        <View style={{ flexDirection: "row", position: "relative", width: "100%" }}>
                            <Text style={{ width: 85, fontSize: 12 }}>Start Date</Text>
                            <Text style={{ fontWeight: "600", fontSize: 12 }}>{item?.immediately ? `${moment(item?.createdAt).format('MMM DD, YYYY (hh:mm A)')}` : `${item?.uploadDate} (${item?.uploadTime})`}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ width: 85, fontSize: 12 }}>End Date</Text>
                            <Text style={{ fontWeight: "600", fontSize: 12 }}>{item?.endDate} ({item?.endTime})</Text>
                        </View>
                        <View style={BrandPostListViewStyle.seperator}></View>
                        <View style={BrandPostListViewStyle.like}>
                            {item?.status !== 'active' && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedPost(item);
                                        setModalVisible(true);
                                    }}
                                    style={{ position: "absolute", right: 120, top: 2 }}
                                >
                                    <Icon name="delete" size={20} color={colors.expiredStatus} />
                                </TouchableOpacity>
                            )}
                            {item?.status !== 'expired' ? (
                                <Switch
                                    value={item?.status === "active"}
                                    onValueChange={() => fn_updateStatus(item?.status === 'active' ? 'stopped' : 'active', item)}
                                    style={{ position: "absolute", right: -8, top: -1 }}
                                    trackColor={{ false: colors.lightBlack, true: colors.lightMainColor3 }}
                                    thumbColor={item?.status === "active" ? colors.mainColor : colors.darkGray}
                                />
                            ) : (
                                <Switch
                                    value={item?.status === "active"}
                                    onValueChange={() => { toast.hideAll(); toast.show(`❌ Already Expired, can't Active`) }}
                                    style={{ position: "absolute", right: -8, top: -1 }}
                                    trackColor={{ false: colors.lightBlack, true: colors.lightMainColor3 }}
                                    thumbColor={item?.status === "active" ? colors.mainColor : colors.darkGray}
                                />
                            )}
                            {item?.status === "active" && (
                                <Text style={BrandPostListViewStyle.runningStatus}>Active</Text>
                            )}
                            {item?.status === "expired" && (
                                <Text style={BrandPostListViewStyle.expiredStatus}>Expired</Text>
                            )}
                            {item?.status === "stopped" && (
                                <Text style={BrandPostListViewStyle.stoppedStatus}>Stopped</Text>
                            )}
                        </View>
                    </View>
                </View>
            ))}
            <Modal isVisible={isModalVisible}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Confirm Deletion</Text>
                    <Text style={{ fontSize: 14, marginBottom: 20 }}>Are you sure you want to delete this discount?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{ padding: 10, backgroundColor: colors.gray, borderRadius: 5 }}
                        >
                            <Text style={{ color: colors.darkGray }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => fn_deletePost(selectedPost?._id)}
                            style={{ padding: 10, backgroundColor: colors.mainColor, borderRadius: 5 }}
                        >
                            <Text style={{ color: 'white' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default BrandPostListView;