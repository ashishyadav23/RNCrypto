import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'
const TransactionHistory = ({ customContainerStyle, history }) => {
  const renderItem = ({ item }) => {
    return <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: SIZES.base }} onPress={() => console.log("transaction CLicked")}>
      <Image source={icons.transaction} resizeMode="contain" style={{ width: 30, height: 30, tintColor: COLORS.primary }}></Image>
      <View style={{ marginLeft: SIZES.radius, flex: 1 }}>
        <Text style={{ ...FONTS.h3 }}>{item.description}</Text>
        <Text style={{ ...FONTS.body5, color: COLORS.gray }}>{item.date}</Text>
      </View>
      <View style={{ flexDirection: 'row', height: '100%', alignItems: "center" }}>
        <Text style={{ color: item.type == "B" ? COLORS.green : COLORS.red }}>{item.amount} {item.currency}</Text>
        <Image source={icons.right_arrow} style={{ width: 20, height: 20, tintColor: COLORS.gray }}></Image>
      </View>
    </TouchableOpacity>
  }
  return (
    <View style={{
      marginTop: SIZES.padding,
      marginBottom: SIZES.padding * 4,
      marginHorizontal: SIZES.radius,
      padding: 20,
      backgroundColor: COLORS.white,
      borderRadius: SIZES.radius,
      ...customContainerStyle
    }}>
      <Text style={{ ...FONTS.h2 }}>Transaction History</Text>
      <FlatList
        contentContainerStyle={{ marginTop: SIZES.radius }}
        scrollEnabled={false}
        data={history}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: '100%', height: 1, backgroundColor: COLORS.lightGray }}></View>}
        renderItem={renderItem}
      ></FlatList>
    </View>
  )
}

export default TransactionHistory

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 8
  }
})