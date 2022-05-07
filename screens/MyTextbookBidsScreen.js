import {React, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';

import { getTextbook } from '../services/TextbookService.js';
import { getBidsForTextbook, getBidsForTextbookOnDate } from '../services/BidsService.js';
import { register_reservations, getReservationsForTextbook } from '../services/ReservationsService.js';
import { getUser } from '../services/UsersService.js';

export default function MyTextbookBidsScreen ({navigation, route}) {
    const { textbookId } = route.params;
    const [textbook, setTextbook] = useState({});
    const [auctionDate, setAuctionDate] = useState(new Date());
    const [auctionError, setAuctionError] = useState(false);
    const [displayAuctionResult, setDisplayAuctionResult] = useState(false);
    const [winningBids, setWinningBids] = useState([]);

    const [bidsForTextbook, setBidsForTextbook] = useState('');
    const [reservationsForTextbook, setReservationsForTextbook] = useState([]);
    const [dateChosen, setDateChosen] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [usernameDict, setUsernameDict] = useState({});

    const fetchTextbook = async () => {
        try {
            const textbook = await getTextbook(textbookId);
            setTextbook (textbook);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching textbook data");
        }
    };

    useEffect(() => {
        fetchTextbook();
    }, []);

    const fetchBidsForTextbook = async () => {
        try {
            const bidsForTextbook = await getBidsForTextbook(textbookId);
            setBidsForTextbook (bidsForTextbook);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching bids for textbook data");
        }
    };

    useEffect(() => {
        fetchBidsForTextbook();
    }, []);

    const fetchBidsForTextbookOnDate = async (date) => {
        try {
            const bidsForTextbookOnDate = await getBidsForTextbookOnDate(textbookId, date);
            return bidsForTextbookOnDate;
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching bids for textbook on date data");
        }
    };

    const onAuctionDateChange = (selectedDate) => {
		const currentDate = selectedDate;
		setAuctionDate(currentDate);
        setDateChosen(true);
        setShowDatePicker(false);
	};

    const resetDate = () => {
        setDateChosen(false)
        setShowDatePicker(false)
    }
    useEffect(()=>{
        runAuction(auctionDate)
    }, []);
    const runAuction = async (date) => {
        setDisplayAuctionResult(true);
        const bids = await fetchBidsForTextbookOnDate(date);

        await fetch("https://bookshare-4q6zvau4zq-ue.a.run.app/bids", {
            method: 'post',
            headers: { 'Content-Type': 'application/json',},
            body:  JSON.stringify({'bids': bids})
        }).then(function(response){ 
            return response.json; 
        }).catch(error => {
            console.log('error', error)
        });

        if (bids.length == 0){
            setAuctionError (true);
            return false;
        } else {
            setAuctionError(false);
            fetch('https://bookshare-4q6zvau4zq-ue.a.run.app/auction').then(res => res.json()).then(data => {
                setWinningBids(data.winning_bids)
            }).catch(error => {
            console.log(error)
            })
            setWinningBids(bids);
            register_reservations(bids);
            return false;
        }
    }

    const fetchReservationsForTextbook = async () => {
        try {
            const reservationsForTextbook = await getReservationsForTextbook(textbookId);
            setReservationsForTextbook (reservationsForTextbook);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching reservations for textbook");
        }
    };

    useEffect(() => {
        fetchReservationsForTextbook();
    }, []);

    const fetchUserName = async (id) => {
        try {
            const user = await getUser(id)
            setUsernameDict(prevState => ({
                ...prevState,
                [id]: user.username
            }));
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching username");
        }
    }

    function renderReservation(reservation) {
        fetchUserName(reservation.renter_id);
        var start_time = new Date(reservation.start_time.seconds * 1000);
        var end_time = new Date(reservation.end_time.seconds * 1000);
        return (
        <View style = {styles.reservationsListContainer} key={reservation.reservation_id}>
            <Text style = {styles.name_header}>Renter: {usernameDict[reservation.renter_id]} </Text>
            <Text>Date: {start_time.getMonth()+ 1 +"/"+(start_time.getDate())+"/"+start_time.getFullYear()} </Text>
            <Text>Time: {start_time.getHours()+":"+start_time.getMinutes()} to {end_time.getHours()+":"+end_time.getMinutes()} </Text>
            <Text>Total price: {reservation.duration * reservation.price} </Text>
        </View>
        );
    }

    function renderBid(bid) {
        fetchUserName(bid.bidder);
        var start_time = new Date(bid.start_time.seconds * 1000);
        var end_time = new Date(bid.end_time.seconds * 1000);
        console.log(start_time, end_time)
        return (
        <View style = {styles.reservationsListContainer} key={bid.bid_id}>
            <Text style = {styles.name_header}>Renter: {usernameDict[bid.bidder]} </Text>
            <Text>Date: {start_time.getMonth()+ 1 +"/"+(start_time.getDate())+"/"+start_time.getFullYear()} </Text>
            <Text>Time: {start_time.getHours()+":"+start_time.getMinutes()} to {end_time.getHours()+":"+end_time.getMinutes()} </Text>
            <Text>Total price: {bid.duration * bid.value} </Text>
        </View>
        );
    }

    return (
        <ScrollView style = {{flexDirection: 'column', backgroundColor:'white'}}>
            <View style = {styles.infocontainer}>
                <View style = {styles.text_container}>
                    <Text style= {styles.title}>{textbook.name}  </Text>
                    <Text style= {styles.subtitle}>{textbook.author}  </Text>
                    <Text style= {styles.description}>{textbook.description}  </Text>
                </View>
                <Image style = {styles.image} source = {{uri: textbook.image}} />
            </View>

            <View style = {{padding: 30}}>
                <Text style= {styles.header}>Upcoming Reservations: </Text>
                {reservationsForTextbook.length === 0
                    ? <Text> No upcoming reservations </Text>
                    : <View style={styles.reservationsList}>
                        {reservationsForTextbook.map((reservation) => renderReservation(reservation))}
                    </View>
                }
            </View>

            <View style = {{padding: 30}}>
                <Text style= {styles.header}>Upcoming Bids </Text>
                <Text>You have received {bidsForTextbook.length} bids for your textbook </Text>
            </View>
            
            <View style={styles.auction_container}>
                <Text style = {{fontWeight: 'bold', fontSize: 15}}>Run auction on upcoming date to get more reservations: </Text>
                <View>
                    <TouchableOpacity style={styles.textInput} onPress={()=>{setShowDatePicker(true)}}>
                        <Ionicons name="calendar" size = {30} style = {styles.icon} />
                        <DateTimePickerModal
                            isVisible={showDatePicker}
                            mode="date"
                            onConfirm={onAuctionDateChange}
                            onCancel={resetDate}
                            minimumDate={new Date()}
                        />
                        { !dateChosen
                            ? <Text style={styles.empty_text}>Pick date of auction*</Text>
                            : <Text style={styles.filled_in_text}>
                                {auctionDate.getMonth()+ 1 +"/"+(auctionDate.getDate())+"/"+auctionDate.getFullYear()}
                            </Text>
                        }
                    </TouchableOpacity>
                </View>

                {
                    !dateChosen
                    ? <View style = {styles.continue_container_pre_selection}>
                        <Text style = {{color: 'white', fontWeight: 'normal'}}>Run Auction </Text>
                      </View>
                    : <TouchableOpacity style = {styles.continue_container} onPress={()=>{{ runAuction(auctionDate) }}}>
                        <Text style = {{color: 'white', fontWeight: 'normal'}}>Run Auction </Text>
                      </TouchableOpacity>
                }
                

                {auctionError && displayAuctionResult && <Text>Sorry, you received no bids for that day </Text>}
                {!auctionError && displayAuctionResult &&
                ((winningBids.length > 0)
                ? <View> 
                    <Text>New reservations registered: </Text>
                    <View style={styles.reservationsList}>
                        {winningBids.map((bid) => renderBid(bid))}
                    </View>
                  </View>
                : <Text style = {{fontStyle:'italic', color:'grey'}}>No new reservations registered</Text>) }
            </View>   
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        height:200,
        width:150,
    },
    text_container:{
        flexDirection: 'column',
        width: 200,
        padding: 8,
    },
    infocontainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor:'#B0C4DE',
    },
    auction_container: {
        flexDirection:'column',
        padding: 10,
        margin: 10,
        borderColor:'#B0C4DE',
        borderRadius: 40/3,
        borderWidth: 2,
    },
    reservationsList: {
        backgroundColor:'#F5FCFF',
        height: 200,
        padding: 5,
        borderRadius: 40 / 2,
    },
    reservationsListContainer: {
        backgroundColor:'#DBF3FA',
        padding:8,
        marginHorizontal:10,
        borderRadius: 40 / 3,
        margin: 10,
        height: 100,
    },
    continue_container_pre_selection: {
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'grey',
        height: 40,
        padding: 5,
        borderRadius: 40 / 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
    },
    continue_container: {
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'navy',
        height: 40,
        padding: 5,
        borderRadius: 40 / 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
    },
    header: {
		fontSize: 17,
		fontWeight: 'bold',
	},
    title: {
		fontSize: 30,
		fontWeight: 'bold',
	},
    subtitle: {
		fontSize: 15,
	},
    description: {
		fontSize: 12,
	},
    textInput: {
		width: 320,
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
});