import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView, ScrollView
} from 'react-native';
import HeaderBar from '../components/headerBar';
import { dummyData, icons, SIZES, FONTS, COLORS } from "../constants"

const Transaction = ({ route, navigation }) => {
    const { currency: selectedCurrency } = route.params
    const { image, code, currency, amount, type, changes, chartData, wallet, description } = selectedCurrency;
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightGray1, flex: 1 }}>
            <HeaderBar right={false} />
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={{ padding: SIZES.padding }}></View>
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

export default Transaction;