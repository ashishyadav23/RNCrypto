import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import { COLORS, icons, SIZES, FONTS } from "../constants"

const CurrencyLabel = ({ icon, currency, code }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image source={icon} resizeMode={'cover'} style={{ width: 25, height: 25, margin: 5 }}></Image>
      <View style={{ marginHorizontal: SIZES.base }}>
        <Text style={{ ...FONTS.h2 }}>{currency}</Text>
        <Text style={{ ...FONTS.body4, color: COLORS.gray }}>{code}</Text>
      </View>
    </View>
  )
}

export default CurrencyLabel

const styles = StyleSheet.create({})