import {React} from 'react';
import { Text, FlatList, StyleSheet, View, Image} from 'react-native';
import { formatPhoneNumber } from 'react-phone-number-input';

export default function BidsPlacedScreen ({navigation, route}) {
    const { myBids, userDict, textbookDict } = route.params;

    const renderItem = ({item: bid}) => {
        var start_time = bid['start_time'];
        var end_time = bid['end_time'];
        const textbook_id = bid.book_id;
        const textbook = textbookDict[textbook_id]
        const textbook_owner_id = textbook.owner;
        const owner = userDict[textbook_owner_id]
        return (
        <View style = {styles.itemsListContainer}>
            <View style= {styles.header_container}>
                <Text style = {styles.name_header}> {textbook.name} </Text> 
                <Text style = {styles.text}> Author: {textbook.author} </Text>
            </View>
            <View style= {styles.content_container}>
            <View style= {styles.image_container}>
               <Image style = {styles.textbook_image} source ={{uri: textbook.image}}/> 
            </View>   
            <View style= {styles.text_container}>
                    <Text> Date: {start_time.getMonth()+ 1 +"/"+(start_time.getDate())+"/"+start_time.getFullYear()} </Text>
                    <Text> Time: {start_time.getHours()+":"+start_time.getMinutes()} to {end_time.getHours()+":"+end_time.getMinutes()} </Text>
                    <Text> Total price: {bid.duration * bid.value} </Text>
                    <Text style = {styles.text}> Rented by {owner.username}:  </Text>
                    <Text style = {styles.text}>   {owner.email} </Text>
                    <Text style = {styles.text}>   {formatPhoneNumber("+1"+owner.phone_number)} </Text>
                </View>
                 </View>
        </View>  
        );
    }

    return (
        <View>
            {myBids.length === 0
                ? <Text> No bids currently placed </Text>
                :<FlatList
                style={styles.itemsList}
                contentContainerStyle={styles.itemsListContainer}
                keyExtractor={(item) => item.bid_id.toString()}
                data={myBids}
                renderItem={renderItem}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    itemsList: {
        backgroundColor:'#F5FCFF',
        height: 680,
        padding: 5,
        borderRadius: 40 / 2,
    },
    itemsListContainer: {
        backgroundColor:'#DBF3FA',
        padding:8,
        marginHorizontal:10,
        borderRadius: 40 / 3,
        margin: 10,
    },
    header_container: {
        marginBottom: 15,
    },
    content_container: {
        flexDirection: 'row',
    },
    image_container:{
        width: 90,
    },
    text_container:{
        width: 240,
    },
    name_header: {
        fontSize: 20,
        fontWeight:'bold',
    }, 
    textbook_image: {
        height:80,
        width: 80,
    }
  });
  