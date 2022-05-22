import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SIZES, COLORS, FONTS } from "../constants"

const TextButton = ({ label, customContainerStyle, customlabelstyle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ height: 45, alignItems: "center", justifyContent: "center", borderRadius: SIZES.radius, backgroundColor: COLORS.green, ...customContainerStyle }}>
      <Text style={{ color: COLORS.white, ...FONTS.h3, ...customlabelstyle }}>{label}</Text>
    </TouchableOpacity>
  )
}

export default TextButton

const styles = StyleSheet.create({})