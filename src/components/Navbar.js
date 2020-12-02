import React from 'react'
import {View, Text, StyleSheet, Button, Alert} from 'react-native'


const Separator = () => (
  <View style={styles.separator} />
);

export const Navbar  = (props) => {
	return(
		<View style={styles.navbar}>
			<Text style={styles.text}>{props.title}</Text>
		</View>
		) 
} 

const styles = StyleSheet.create({
	navbar: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#393939',
    paddingBottom: 10
  },
	text: {
		color: '#fff',
		fontSize:20
	},
	separator: {
	    marginVertical: 8,
	    borderBottomColor: '#737373',
	    borderBottomWidth: StyleSheet.hairlineWidth,
	}
})

