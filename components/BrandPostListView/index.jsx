import React, { useState } from 'react'
import { Image, Switch, Text, View } from 'react-native'
import { BrandPostListViewStyle, colors } from '../../style/style'

import FontAwesome from "react-native-vector-icons/FontAwesome";

import img1 from "../../assets/grid1.jpg";
import img2 from "../../assets/grid2.jpg";
import img3 from "../../assets/grid3.png";
import img4 from "../../assets/grid4.jpg";

const BrandPostListView = () => {
    const [isStopped, setIsStopped] = useState(false);
    return (
        <View style={BrandPostListViewStyle.listMain}>
            <View style={BrandPostListViewStyle.singleList}>
                <Image source={img1} style={BrandPostListViewStyle.singleListPost} />
                <View style={{ gap: 3, flex: 1 }}>
                    <View style={{ flexDirection: "row", position: "relative", width: "100%" }}>
                        <Text style={{ width: 85 }}>Start Date</Text>
                        <Text style={{ fontWeight: "700" }}>Mar 03, 2025</Text>
                        <Text style={BrandPostListViewStyle.runningStatus}>Active</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: 85 }}>End Date</Text>
                        <Text style={{ fontWeight: "700" }}>April 03, 2025</Text>
                    </View>
                    <View style={BrandPostListViewStyle.seperator}></View>
                    <View style={BrandPostListViewStyle.like}>
                        <FontAwesome name="heart" style={BrandPostListViewStyle.likeIcon} />
                        <Text style={BrandPostListViewStyle.likeText}>20</Text>
                        <Switch
                            value={isStopped}
                            onValueChange={() => setIsStopped(!isStopped)}
                            style={{ position: "absolute", right: -8, top: -1 }}
                            trackColor={{ false: colors.lightBlack, true: colors.lightMainColor3 }}
                            thumbColor={isStopped ? colors.mainColor : colors.darkGray}
                        />
                    </View>
                </View>
            </View>
            <View style={BrandPostListViewStyle.singleList}>
                <Image source={img2} style={BrandPostListViewStyle.singleListPost} />
                <View style={{ gap: 3, flex: 1 }}>
                    <View style={{ flexDirection: "row", position: "relative", width: "100%" }}>
                        <Text style={{ width: 85 }}>Start Date</Text>
                        <Text style={{ fontWeight: "700" }}>March 01, 2025</Text>
                        <Text style={BrandPostListViewStyle.expiredStatus}>Expired</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: 85 }}>End Date</Text>
                        <Text style={{ fontWeight: "700" }}>April 01, 2025</Text>
                    </View>
                    <View style={BrandPostListViewStyle.seperator}></View>
                    <View style={BrandPostListViewStyle.like}>
                        <FontAwesome name="heart" style={BrandPostListViewStyle.likeIcon} />
                        <Text style={BrandPostListViewStyle.likeText}>5</Text>
                    </View>
                </View>
            </View>
            <View style={BrandPostListViewStyle.singleList}>
                <Image source={img3} style={BrandPostListViewStyle.singleListPost} />
                <View style={{ gap: 3, flex: 1 }}>
                    <View style={{ flexDirection: "row", position: "relative", width: "100%" }}>
                        <Text style={{ width: 85 }}>Start Date</Text>
                        <Text style={{ fontWeight: "700" }}>March 01, 2025</Text>
                        <Text style={BrandPostListViewStyle.stoppedStatus}>Stopped</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: 85 }}>End Date</Text>
                        <Text style={{ fontWeight: "700" }}>April 01, 2025</Text>
                    </View>
                    <View style={BrandPostListViewStyle.seperator}></View>
                    <View style={BrandPostListViewStyle.like}>
                        <FontAwesome name="heart" style={BrandPostListViewStyle.likeIcon} />
                        <Text style={BrandPostListViewStyle.likeText}>0</Text>
                    </View>
                </View>
            </View>
            <View style={BrandPostListViewStyle.singleList}>
                <Image source={img4} style={BrandPostListViewStyle.singleListPost} />
                <View style={{ gap: 3, flex: 1 }}>
                    <View style={{ flexDirection: "row", position: "relative", width: "100%" }}>
                        <Text style={{ width: 85 }}>Start Date</Text>
                        <Text style={{ fontWeight: "700" }}>March 01, 2025</Text>
                        <Text style={BrandPostListViewStyle.runningStatus}>Active</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: 85 }}>End Date</Text>
                        <Text style={{ fontWeight: "700" }}>May 01, 2025</Text>
                    </View>
                    <View style={BrandPostListViewStyle.seperator}></View>
                    <View style={BrandPostListViewStyle.like}>
                        <FontAwesome name="heart" style={BrandPostListViewStyle.likeIcon} />
                        <Text style={BrandPostListViewStyle.likeText}>10</Text>
                        <Switch
                            value={isStopped}
                            onValueChange={() => setIsStopped(!isStopped)}
                            style={{ position: "absolute", right: -8, top: -1 }}
                            trackColor={{ false: colors.lightBlack, true: colors.lightMainColor3 }}
                            thumbColor={isStopped ? colors.mainColor : colors.darkGray}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default BrandPostListView;