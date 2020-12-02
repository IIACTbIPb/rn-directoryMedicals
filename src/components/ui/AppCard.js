import React from 'react'
import {View, StyleSheet} from 'react-native'

export const AppCard =(props) => (<View style={{...styles.default, ...styles.props}}>{props.children}</View>)

const styles = StyleSheet.create({
	default:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		backgroundColor:'#fff',
		elevation:8,
		padding:10,
	}
})