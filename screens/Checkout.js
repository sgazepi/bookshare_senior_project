import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { register_bid } from '../services/BidsService.js';
export default function Checkout ({navigation, items}) {
    const handlePress = () => {
        items.array.forEach(element => {
            register_bid(element.name, element.start_time, element.end_time, element.duration, element.totalPrice);
        });
        navigation.navigate('BottomTap');
    }

    return (
        <View>
            <Text style = {{fontSize: 20, fontWeight: 'bold', padding: 10}}> Payment Method: </Text>
            <Text style = {{padding: 10}}>[TODO] Add stripe or similar API</Text>
            <TouchableOpacity style = {styles.continue_container} onPress={()=>{{ handlePress() }}}>
                <Text style = {{color: 'white', fontWeight: 'normal'}}> Confirm Bid </Text>
            </TouchableOpacity> 
        </View>
    );
}

const styles = StyleSheet.create({
    continue_container: {
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'navy',
        height: 40,
        padding: 5,
        borderRadius: 40 / 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
});