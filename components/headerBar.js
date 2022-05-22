import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS, FONTS, icons, SIZES, } from '../constants'
const HeaderBar = ({ right = false }) => {
  const navigation = useNavigation();
  return (
    <View style={{ paddingHorizontal: SIZES.radius, height: 45, flexDirection: 'row', alignItems: "center" }}>
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icons.back_arrow} resizeMode="contain" style={{ width: 25, height: 25, tintColor: COLORS.gray }}></Image>
          <Text style={{ ...FONTS.h4, marginLeft: SIZES.base }}>Back</Text>
        </TouchableOpacity>
      </View>
      {right && <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => { }}>
          <Image source={icons.star} resizeMode="contain" style={{ width: 20, height: 20 }}></Image>
        </TouchableOpacity>
      </View>}
    </View>
  )
}

export default HeaderBar

const styles = StyleSheet.create({})