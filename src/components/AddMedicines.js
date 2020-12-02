import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Button,Alert, Text, Keyboard} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import {AppButton} from './ui/AppButton'



export const AddMedicines = props => {
	
	const [value, setValue] = useState('');

	const clickButton = () => {
		if(value.trim()){
			props.addMedical(value)
			setValue('')
			Keyboard.dismiss()
		}else{
			Alert.alert('Введите название');
		}
	}

	return(
			<View style={styles.block}>
				<TextInput style={styles.input} onChangeText={setValue} value={value} placeholder="Введите название"/>
				{/*<Button title="Добавить" color="#aaa" onPress={clickButton} />*/}
				{/*<AntDesign.Button onPress={clickButton} name="pluscircleo" color="#fff"  >Добавить</AntDesign.Button>*/}
				<AppButton  onPress={clickButton}>Добавить</AppButton>
			
			</View>
		)
}

const styles = StyleSheet.create({
	block:{
		flexDirection: 'row',
		justifyContent:'space-between',
		alignItems:'center',
		marginBottom:15

	},
	button:{
		padding:10,
		backgroundColor:'#aaa',
	},
	input:{
		width:'65%',
		paddingHorizontal:10,
		paddingVertical:5,
		elevation:8,
		backgroundColor:'#fff',
		borderRadius: 5,
	}
})