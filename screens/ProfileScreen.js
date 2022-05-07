import {React, useState, useEffect} from 'react';
import { View, Text} from 'react-native';
import {StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase/compat';
import { formatPhoneNumber } from 'react-phone-number-input';
import { getTextbook } from '../services/TextbookService.js';
import { getMyBids } from '../services/BidsService.js';
import { getMyReservations } from '../services/ReservationsService.js';
import { getUser } from '../services/UsersService.js';

export default function ProfileScreen ({navigation}) {
    const [user, setUser] = useState({});
    const currentUserUID = firebase.auth().currentUser.uid;
    const [myBids, setMyBids] = useState([]);
    const [myReservations, setMyReservations] = useState([]);
    const [userDict, setUserDict] = useState({});
    const [textbookDict, setTextbookDict] = useState({});
    useEffect(() => {
        fetchData();
    }, []);    
    
    const fetchData = async () => {
        try {
          // bids 
            const bids = await getMyBids();
            setMyBids (bids);
            for (const bid of bids) {
                const textbook_id = bid.book_id;
                const textbook = await getTextbook(textbook_id)
                setTextbookDict(prevState => ({
                    ...prevState,
                    [textbook_id]: {
                        name: textbook.name, 
                        author: textbook.author, 
                        owner: textbook.owner,
                        image: textbook.image
                    }
                }));
                const user = await getUser(textbook.owner)
                setUserDict(prevState => ({
                    ...prevState,
                    [textbook.owner]: user
                }));
            }

            // reservations
            const reservations = await getMyReservations();
            setMyReservations (reservations);
            for (const reservation of reservations) {
                const textbook_id = reservation.book_id;
                const textbook = await getTextbook(textbook_id)
                setTextbookDict(prevState => ({
                    ...prevState,
                    [textbook_id]: {
                        name: textbook.name, 
                        author: textbook.author, 
                        owner: textbook.owner,
                        image: textbook.image
                    }
                }));
                const user = await getUser(textbook.owner)
                setUserDict(prevState => ({
                    ...prevState,
                    [textbook.owner]: user
                }));
            }
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching your bids and reservation");
        }
    };

    const fetchUser = async () => {
        try {
            const user = await getUser(currentUserUID);
            setUser(user);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);


    console.log('myBids', myBids)
    console.log('userDict', userDict)
    console.log('textbookDict', textbookDict)
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.name}>{user.username}</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.info}> {user.email} </Text>
              <Text style={styles.info}> {formatPhoneNumber("+1"+(user.phone_number))} </Text>
              <TouchableOpacity style = {styles.buttonContainer} onPress={()=>{{navigation.navigate('BidsPlaced', {
                  myBids: myBids,
                  userDict: userDict,
                  textbookDict: textbookDict,
                })}}}>
                <Text style = {styles.button_text}> Current Bids Placed </Text>
              </TouchableOpacity>
        
             <TouchableOpacity style = {styles.buttonContainer} onPress={()=>{{navigation.navigate('UpcomingReservations', {
                myReservations: myReservations,
                userDict: userDict,
                textbookDict: textbookDict,
             })}}}>
               <Text style = {styles.button_text}> Upcoming Reservations </Text>
             </TouchableOpacity>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "navy",
        height:200,
        alignItems: "center",
        justifyContent: "center",
      },
      name:{
        fontSize:22,
        color:"black",
        fontWeight:'600',
      },
      body:{
        marginTop:40,
        height: 200,
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
      },
      name:{
        fontSize:28,
        color: "white",
        fontWeight: "600"
      },
      info:{
        fontSize:16,
        color: "navy",
        marginTop:10
      },
      description:{
        fontSize:16,
        color: "black",
        marginTop:10,
        textAlign: 'center'
      },
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "navy",
      },
      button_text: {
          color: "white",
      }
});