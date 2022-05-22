import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'
const PriceAlert = ({ customContainerStyle }) => {
  return (
    <TouchableOpacity style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SIZES.padding * 4.5,
      marginHorizontal: SIZES.radius,
      paddingHorizontal: SIZES.radius,
      paddingVertical: SIZES.padding,
      backgroundColor: COLORS.white,
      borderRadius: SIZES.radius,
      ...customContainerStyle,
      ...styles.shadow
    }}>
      <Image source={icons.notification_color} style={{ width: 25, height: 25 }} resizeMode="contain"></Image>
      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        <Text style={{ ...FONTS.h4 }}>Set Price ALert</Text>
        <Text style={{ ...FONTS.body5, color: COLORS.gray }}>Get Notified when Your Coins are moving</Text>
      </View>
      <Image source={icons.right_arrow} style={{ width: 20, height: 20, tintColor: COLORS.gray }} resizeMode="cover"></Image>
    </TouchableOpacity>
  )
}

export default PriceAlert

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