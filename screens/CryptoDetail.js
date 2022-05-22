import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated, Image
} from 'react-native';
import CurrencyLabel from '../components/currencyLabel';
import HeaderBar from '../components/headerBar';
import { dummyData, COLORS, SIZES, icons, images, FONTS } from '../constants'
import { VictoryScatter, VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import { VictoryCustomTheme } from '../styles'
import TextButton from '../components/textButton';
import PriceAlert from '../components/pricealert';
const CryptoDetail = ({ route, navigation }) => {
    const { currency: selectedCurrency } = route.params;
    const { image, code, currency, amount, type, changes, chartData, wallet, description } = selectedCurrency;
    const scrollX = new Animated.Value(0);
    const numberOfCharts = [1, 2, 3];
    const [chartoptions, setchartoptions] = useState(dummyData.chartOptions);
    const [selectedOption, setselectedOption] = useState(chartoptions[0])
    const renderDots = () => {
        const dotPosition = Animated.divide(scrollX, SIZES.width);
        return <View style={{ height: 30, marginTop: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                {numberOfCharts.map((item, pos) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [pos - 1, pos, pos + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                    })
                    const dotSize = dotPosition.interpolate({
                        inputRange: [pos - 1, pos, pos + 1],
                        outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                        extrapolate: 'clamp'
                    })
                    const dotColor = dotPosition.interpolate({
                        inputRange: [pos - 1, pos, pos + 1],
                        outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
                        extrapolate: 'clamp'
                    })
                    return <Animated.View key={`dot-${pos}`} style={{ borderRadius: SIZES.radius * 2, marginHorizontal: 6, width: dotSize, height: dotSize, backgroundColor: dotColor, opacity: opacity }} >

                    </Animated.View>
                })}
            </View>
        </View>
    }
    const renderChart = () => {

        return <View style={{ marginTop: SIZES.base, marginHorizontal: SIZES.radius, alignItems: 'center', borderRadius: SIZES.radius, backgroundColor: COLORS.white, ...styles.shadow }}>
            {/* HEADER */}
            <View style={{ flexDirection: 'row', marginTop: SIZES.radius, paddingHorizontal: SIZES.radius }}>
                <View style={{ flex: 1 }}>
                    <CurrencyLabel icon={image} currency={currency} code={code} />
                </View>
                <View style={{ marginHorizontal: SIZES.radius }}>
                    <Text style={{ ...FONTS.h3 }}>${amount}</Text>
                    <Text style={{ ...FONTS.body3, color: type === "I" ? COLORS.green : COLORS.red }}>{changes}</Text>
                </View>
            </View>
            {/* ChartJs */}
            <Animated.ScrollView horizontal pagingEnabled scrollEventThrottle={16} snapToAlignment="center" snapToInterval={SIZES.width - 40} showsHorizontalScrollIndicator={false} decelerationRate={0} onScroll={Animated.event([{ nativeElement: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })} >
                {numberOfCharts.map((item, index) => <View key={`chart-${index}`} style={{ marginLeft: index === 0 ? SIZES.base : 0 }}><View style={{ marginTop: -25 }}>
                    <VictoryChart theme={VictoryCustomTheme} height={220} width={SIZES.width - 40}>
                        <VictoryLine
                            style={{
                                data: { stroke: COLORS.secondary }, parent: {
                                    border: '1px solid #ccc'
                                }
                            }}
                            animate={{ duration: 1000, onLoad: { duration: 1000 } }}
                            data={chartData}
                            categories={{ x: ['15 min', '30 min', '45 min', '60 min'], y: ['15', '30', '45', '60'] }}
                        >

                        </VictoryLine>
                        <VictoryScatter data={chartData} size={7} style={{ data: { fill: COLORS.secondary } }}></VictoryScatter>
                        <VictoryAxis style={{ grid: { stroke: "transparent" } }}>
                        </VictoryAxis>
                        <VictoryAxis dependentAxis style={{ axis: { stroke: "transparent" }, grid: { stroke: 'grey' } }}>
                        </VictoryAxis>
                    </VictoryChart>
                </View></View>)}
            </Animated.ScrollView>
            {/* CHART OPTIONS */}
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SIZES.padding }}>
                {chartoptions.map(item => <TextButton key={`options-${item.id}`} label={item.label} customContainerStyle={{ height: 30, width: 60, borderRadius: 15, backgroundColor: selectedOption.id === item.id ? COLORS.primary : COLORS.lightGray }} customlabelstyle={{ color: selectedOption.id === item.id ? COLORS.white : COLORS.gray, ...FONTS.body5 }} onPress={() => { setselectedOption(item) }}></TextButton>)}
            </View>
            {/* DOTS */}
            {renderDots()}
        </View>
    }
    const renderBuy = () => {
        return <View style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.radius, padding: SIZES.radius, backgroundColor: COLORS.white, borderRadius: SIZES.radius, ...styles.shadow }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* currency */}
                <View style={{ flex: 1 }}>
                    <CurrencyLabel icon={image} currency={currency} code={code} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <View style={{ marginRight: SIZES.base }}>
                        <Text style={{ ...FONTS.h3 }}>${wallet?.value}</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.gray, textAlign: 'right' }}>{wallet?.crypto}{code}</Text>
                    </View>
                    <Image source={icons.right_arrow} style={{ width: 20, height: 20, tintColor: COLORS.gray }} resizeMode={'cover'}></Image>
                </View>

                {/* Amount */}
            </View>
            <TextButton label={"Buy"} customlabelstyle={{}} customContainerStyle={{ marginTop: 15 }} onPress={() => navigation.navigate('Transaction', { currency: selectedCurrency })}></TextButton>

        </View>
    }
    const renderAbout = () => {
        return <View style={{ marginTop: SIZES.padding, backgroundColor: COLORS.white, borderRadius: SIZES.rad, padding: SIZES.radius, marginHorizontal: SIZES.radius, ...styles.shadow }}>
            <View style={{ flex: 1 }}>
                <Text style={{ ...FONTS.h3 }}>About {currency}</Text>
                <Text style={{ ...FONTS.body4, marginTop: SIZES.base }}>{description}</Text>
            </View>
        </View>
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray1 }}>
            <HeaderBar right={true} />
            <ScrollView style={{ flex: 1, paddingBottom: SIZES.padding }}>
                {renderChart()}
                {renderBuy()}
                {renderAbout()}
                <PriceAlert customContainerStyle={{ marginTop: SIZES.padding, marginHorizontal: SIZES.radius }}></PriceAlert>
            </ScrollView>
        </SafeAreaView>
    )
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

export default CryptoDetail;