import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    FlatList,
    ScrollView
} from 'react-native';
import { StatusBar } from 'react-native';
import PriceAlert from '../components/pricealert';
import TransactionHistory from '../components/transactionHistory';
import { dummyData, COLORS, FONTS, SIZES, icons, images } from '../constants'

const Home = ({ navigation }) => {
    console.log('statusBarHeight: ', StatusBar.setBackgroundColor(COLORS.primary));
    const [trending, settrending] = useState(dummyData.trendingCurrencies);
    const [transactionHistory, settransactionHistory] = useState(dummyData.transactionHistory);
    const renderHeader = () => {
        const renderItem = ({ item, index }) => <TouchableOpacity
            style={{
                width: 180,
                paddingVertical: SIZES.padding,
                paddingHorizontal: SIZES.padding,
                marginLeft: index === 0 ? SIZES.radius : 0,
                marginRight: SIZES.radius, borderRadius: 10,
                backgroundColor: COLORS.white
            }}
            onPress={() => navigation.navigate('CryptoDetail', { currency: item })}>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Image source={item.image} resizeMode="cover" style={{ marginTop: 5, width: 25, height: 25 }}></Image>
                </View>
                <View style={{ marginLeft: SIZES.base }}>
                    <Text style={{ ...FONTS.h2 }}>{item.currency}</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>{item.code}</Text>
                </View>
            </View>
            <View style={{ marginTop: SIZES.radius }}>
                <Text style={{ ...FONTS.h2 }}>${item.amount}</Text>
                <Text style={{ color: item.type == "I" ? COLORS.gray : COLORS.red }}>{item.changes}</Text>
            </View>
        </TouchableOpacity>
        return <View style={{ width: '100%', height: 290, ...styles.shadow }}>
            <ImageBackground source={images.banner} resizeMode="cover" style={{ flex: 1, alignItems: "center", position: 'relative' }}>
                {/* Header Bar Notification */}
                <View style={{ width: '100%', marginTop: SIZES.statusBarHeight, alignItems: "flex-end", paddingHorizontal: SIZES.padding }}>
                    <TouchableOpacity onPress={() => console.log("Notification clicked")} style={{ width: 20, height: 20, alignItems: "center", justifyContent: 'center' }}>
                        <Image source={icons.notification_white} style={{ flex: 1 }} resizeMode="contain"></Image>
                    </TouchableOpacity>
                </View>
                {/* Balance view */}
                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3, }}>Your Portfolio Balance</Text>
                    <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.h1, }}>${dummyData.portfolio.balance}</Text>
                    <Text style={{ color: COLORS.white, ...FONTS.body5, }}>{dummyData.portfolio.changes} Last 24 hours</Text>
                </View>
                {/* Trending View */}
                <View style={{ position: 'absolute', bottom: "-30%" }}>
                    <Text style={{ color: COLORS.white, marginLeft: SIZES.radius, ...FONTS.h2 }}>Trending</Text>
                    <FlatList
                        contentContainerStyle={{ marginTop: SIZES.base, }}
                        data={trending}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}

                    />
                </View>
            </ImageBackground>
        </View>
    }

    const renderAlert = () => {
        return <PriceAlert />
    }
    const renderNotice = () => {
        return <View style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.radius,
            padding: 20,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
            ...styles.shadow
        }}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Investing Safety</Text>
            <Text style={{ color: COLORS.white, ...FONTS.body5, lineHeight: 18, marginTop: SIZES.base }}>It's very difficult to time an investment, especially when the market is volatile. Learn how to use dollar cost averaging to your advantage.</Text>
            <TouchableOpacity onPress={() => console.log("Learn More")} style={{ marginTop: SIZES.base }}>
                <Text style={{ textDecorationLine: 'underline', color: COLORS.green, ...FONTS.h3 }}>Learn More</Text>
            </TouchableOpacity>
        </View>
    }
    const renderTransactionHistory = () => {
        return <TransactionHistory history={transactionHistory} customContainerStyle={{ ...styles.shadow }} />
    }
    return <ScrollView>
        <View style={{ flex: 1 }}>
            {renderHeader()}
            {renderAlert()}
            {renderNotice()}
            {renderTransactionHistory()}
        </View>
    </ScrollView>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default Home;