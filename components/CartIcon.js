import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../CartContext.js';
import { Ionicons } from '@expo/vector-icons';

export function CartIcon({navigation}) {
	const {getItemsCount} = useContext (CartContext);
	return (
		<TouchableOpacity style = {styles.container}
				onPress = {() => {
					navigation.navigate('Cart');
			}}>
				<Ionicons name="cart" color = "white" size={30}/>
				<Text style = {styles.text}> ({getItemsCount()})</Text>

		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		backgroundColor: 'navy',
		height: 40,
		flexDirection:'row',
		padding: 5,
		borderRadius: 40 / 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#ccc',
		fontWeight: 'normal',
	},
});