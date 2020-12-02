import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Platform, TouchableNativeFeedback} from 'react-native'

export const AppButton = ({children, onPress, color = '#aaa'}) =>{
	const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
	return(
			<Wrapper onPress={onPress} activeOpacity={0.7}>
				<View style={{...styles.button, backgroundColor: color}}>
					<Text style={styles.text}>{children}</Text>
				</View>
			</Wrapper>
		)
}

const styles = StyleSheet.create({
	button:{
		paddingHorizontal:20,
		paddingVertical:10,
		borderRadius:5,
		flexDirection:'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text:{
		color:'#fff',
		fontSize:16
	}
})