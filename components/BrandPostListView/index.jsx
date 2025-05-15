import React from 'react'
import moment from 'moment';
import { Image, Switch, Text, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications';
import { BrandPostListViewStyle, colors } from '../../style/style';

import { API_URL } from '@env';

import { fn_updatePostStatusApi } from '../../api/api';
// import FontAwesome from "react-native-vector-icons/FontAwesome";

const BrandPostListView = ({ data, fn_getPosts }) => {

    const toast = useToast();

    const fn_updateStatus = async (status, item) => {
        toast.hideAll();
        const response = await fn_updatePostStatusApi(status, item._id);
        if (response?.status) {
            toast.show("✅ Status Updated");
            fn_getPosts();
        } else {
            toast.show(`❌ ${response?.message}`);
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
                            {/* <FontAwesome name="heart" style={BrandPostListViewStyle.likeIcon} />
                            <Text style={BrandPostListViewStyle.likeText}>20</Text> */}
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
        </View>
    )
}

export default BrandPostListView;