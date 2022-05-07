import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
export function Textbook({name, author, price, image, onPress}) {
	return (
		<TouchableOpacity style={styles.card} onPress = {onPress}>
		<View style = {styles.imagecontainer}>
			<Image
				style = {styles.thumb}
				source ={{uri: image}}
			/>
		</View>
		<View style={styles.infoContainer}>
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.author}>{author}</Text>
			<Text style={styles.price}>Minimum Bid ${price}</Text>
		</View>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	card: {
		backgroundColor:'#F5FFFA',
		borderRadius: 20,
		shadowOpacity: 0.25,
		shadowRadius: 5,
		shadowColor: '#000',
		shadowOffset: {
			height: 0,
			width: 0,
		},
		elevation: 1,
		marginVertical: 18,
	},
	imagecontainer: {
		alignItems: 'center',
	},
	thumb: {
		height: 400,
		width: 300,
		borderTopLeftRadius: 14,
		borderTopRightRadius: 14,
	},
	infoContainer: {
		padding: 25,
	},
	name: {
		fontSize: 22,
		fontWeight: 'bold',
	},
	author: {
		fontSize: 19,
		fontWeight: 'normal',
	},
	price: {
		fontSize: 18,
		fontWeight: 'normal',
		marginBottom:10,
	},
});
