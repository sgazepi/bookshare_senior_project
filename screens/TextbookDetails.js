import React, {useEffect, useState, useContext} from 'react';
import {
	Text,
	Image,
	View,
	ScrollView,
	SafeAreaView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { HelperText } from 'react-native-paper';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';

import { getTextbook } from '../services/TextbookService.js';
import { CartContext } from '../CartContext';

export default function TextbookDetails ({navigation, route}) {
	const { textbookId } = route.params;
	const [textbook, setTextbook] = useState({});

	const fetchTextbook = async (textbookId) => {
        try {
          const textbook = await getTextbook(textbookId);
		  setTextbook (textbook);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching textbook data");
        }
    };
	useEffect(() => {
		fetchTextbook(textbookId);	
	}, []);

	const [date, setDate] = useState(new Date());
	const [start_time, setStartTime] = useState(new Date());
	const [end_time, setEndTime] = useState(new Date());

	const [datePickerVisibility, setDatePickerVisibility] = useState(false);
	const [datePicked, setDatePicked] = useState(false);
	const [startTimePickerVisibility, setStartTimePickerVisibility] = useState(false);
	const [startTimePicked, setStartTimePicked] = useState(false);
	const [endTimePickerVisibility, setEndTimePickerVisibility] = useState(false);
	const [endTimePicked, setEndTimePicked] = useState(false);

	const onDateChange = (selectedDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
		setDatePicked(true);
		setDatePickerVisibility(false);
	};

	const onStartTimeChange = (selectedDate) => {
		const currentDate = selectedDate;
		setStartTime(currentDate);
		setStartTimePicked(true);
		setStartTimePickerVisibility(false);
	};

	const onEndTimeChange = (selectedDate) => {
		const currentDate = selectedDate;
		setEndTime(currentDate);
		setEndTimePicked(true);
		setEndTimePickerVisibility(false);
	};

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	}

	const showStartTimePicker = () => {
		setStartTimePickerVisibility(true);
	}

	const showEndTimePicker = () => {
		setEndTimePickerVisibility(true);
	}

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	}

	const hideStartTimePicker = () => {
		setStartTimePickerVisibility(false);
	}

	const hideEndTimePicker = () => {
		setEndTimePickerVisibility(false);
	}

	const [bid, setBid] = useState(null);
	const [bidError, setBidError] = useState(true);
	const onEnterBid = (bid) => {
		if ( bid < textbook.price) {
			setBidError(true);
		} else {
			setBid(bid);
			setBidError(false);
		}
	}

	const { addItemToCart } = useContext(CartContext);
	function onAddToCart() {
		if (!datePicked) {
			Alert.alert('Date Required');
		} else if (!startTimePicked) {
			Alert.alert('Start Time Required');
		} else if (!endTimePicked) {
			Alert.alert('End Time Required')
		} else if (bidError) {
		Alert.alert('Please enter valid bid');
		} else {
			start_time.setDate(date.getDate())
			start_time.setMonth(date.getMonth())
			start_time.setFullYear(date.getFullYear())
			end_time.setDate(start_time.getDate())
			end_time.setMonth(start_time.getMonth())
			end_time.setFullYear(start_time.getFullYear())
			console.log(date, start_time)
			addItemToCart(textbook.book_id, Number(bid), start_time, end_time);
			navigation.navigate('Cart');
		} 
	}

	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic" style = {{height: 1000}}>
		<SafeAreaView style = {styles.scrollContainer}>
			<Image
				style = {styles.image}
				source = {{uri: textbook.image}}
			/>

			<View style = {styles.infoContainer}>
				<Text style={styles.name}>{textbook.name} </Text>
				<Text style={styles.author}>{textbook.author} </Text>
				<Text style={styles.price}>Minimum Bid: ${textbook.price} </Text>
				<Text style={styles.description}>{textbook.description} </Text>
			</View>
			
			<View style = {styles.container}>
				<Text style = {styles.text_header}>Pick date </Text>
				<TouchableOpacity style={styles.textInput} onPress={showDatePicker}>
					<Ionicons name="calendar" size = {30} style = {styles.icon} />
					<DateTimePickerModal
						isVisible={datePickerVisibility}
						mode="date"
						onConfirm={onDateChange}
						onCancel={hideDatePicker}
						minimumDate={new Date()}
					/>
					{ !datePicked
						? <Text style={styles.empty_text}>Date*</Text>
						: <Text style={styles.filled_in_text}>
							{date.getMonth()+ 1 +"/"+(date.getDate())+"/"+date.getFullYear()}
						 </Text>
					}
				</TouchableOpacity>

				<Text style = {styles.text_header}>Pick start time </Text>
				<TouchableOpacity style={styles.textInput} onPress={showStartTimePicker}>
					<Ionicons name="time" size = {30} style = {styles.icon} />
					<DateTimePickerModal
						isVisible={startTimePickerVisibility}
						mode="time"
						onConfirm={onStartTimeChange}
						onCancel={hideStartTimePicker}
						minuteInterval = {15}
					/>
					{ !startTimePicked
						? <Text style={styles.empty_text}>Start Time*</Text>
						: <Text style={styles.filled_in_text}>{start_time.getHours()+":"+start_time.getMinutes()}</Text>
					}
				</TouchableOpacity>

				<Text style = {styles.text_header}>Pick end time </Text>
				<TouchableOpacity style={styles.textInput} onPress={showEndTimePicker}>
					<Ionicons name="time" size = {30} style = {styles.icon} />
					<DateTimePickerModal
						isVisible={endTimePickerVisibility}
						mode="time"
						onConfirm={onEndTimeChange}
						onCancel={hideEndTimePicker}
						minimumDate={start_time}
						minuteInterval = {15}
					/>
					{ !endTimePicked
						? <Text style={styles.empty_text}>End Time*</Text>
						: <Text style={styles.filled_in_text}>{end_time.getHours()+":"+end_time.getMinutes()}</Text>
					}
				</TouchableOpacity>

				<Text style = {styles.empty_text}>Enter a bid: </Text>
				<TextInput
					style={styles.textInput}
					value={bid}
					placeholder="    Bid*"
					placeholderTextColor = 'grey'
					keyboardType="numeric"
					returnKeyType='done'
					onChangeText={onEnterBid}
				/>
				<HelperText type="error" visible={bidError}>
					Please enter a valid bid!
				</HelperText>

				<TouchableOpacity style = {styles.continue_container} onPress={onAddToCart}>
					<Text style = {{color: '#ccc', fontWeight: 'normal'}}> Submit bid for slot </Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	text_header:{
		fontSize: 16,
		marginLeft:5,
		padding: 5,
	},
	empty_text:{
		color: 'grey',
		marginLeft:5,
		marginTop:5,
		padding: 5,
		fontSize: 17,
	},
	filled_in_text:{
		marginLeft:5,
		marginTop:5,
		padding: 5,
		fontSize: 17,
	},
	continue_container: {
		marginHorizontal: 10,
		marginVertical: 5,
		backgroundColor: 'navy',
		height: 40,
		padding: 5,
		width: 200,
		borderRadius: 40 / 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollContainer: {
		borderRadius: 20,
		shadowOpacity: 0.25,
		shadowRadius: 5,
		height: 1000,
		elevation: 1,
		marginVertical: 18,
		flex:1,
	},
	image: {
		height: 400,
		width: 300,
		marginLeft: 40,
	},
	infoContainer: {
		padding: 20,
	},
	name: {
		fontSize: 22,
		fontWeight: 'bold',
	},
	author: {
		fontSize: 20,
		fontWeight: 'normal',
	},
	price: {
		fontSize: 18,
		fontWeight:'normal',
		marginBottom: 10,
	},
	description: {
		fontSize: 15,
		fontWeight: 'normal',
		color: '#333',
		marginBottom: 18,
	},
	container: {
		flex: 1,
		width: 200,
		marginLeft:20,
		flexDirection: 'column',
		padding: 5,
	},
	textInput: {
		width: 300,
		height: 50,
		fontSize:18,
		borderWidth: 1,
		borderColor:'grey',
		alignContent: 'center',
		padding: 1,
		margin: 5,
		borderRadius:10,
		flexDirection:"row",
	  },
	  icon: {
		  marginLeft: 3,
		  marginRight: 3,
		  marginTop: 3.5,
		  marginBottom: 3,
	  },
});

