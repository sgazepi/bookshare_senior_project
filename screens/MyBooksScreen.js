import {React, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { getMyTextbooks } from '../services/TextbookService.js';
import { Textbook } from '../components/Textbook.js';

export default function MyBooksScreen ({navigation}) {
    function renderMyTextbook({item: textbook}) {
        return (
            <Textbook {...textbook}
            onPress={()=>{
                navigation.navigate('MyTextbookBids', {
                    textbookId: textbook.book_id,
                });
            }}
            />
        );
    }

    const [myTextbooks, setMyTextbooks] = useState([]);

    const fetchMyTextbooks = async () => {
        try {
            const textbooks = await getMyTextbooks();
            setMyTextbooks (textbooks);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching textbook data");
        }
    }; 

    useEffect(() => {
        fetchMyTextbooks();
    });

    return (
        <View style = {styles.container} >
            <View>
            { myTextbooks.length == 0
            ? <Text style = {styles.emptyListText}> You are currently not renting any textbooks! </Text>
            : <FlatList
                    style={styles.textbooksList}
                    contentContainerStyle={styles.textbooksListContainer}
                    keyExtractor={(item) => item.book_id.toString()}
                    data={myTextbooks}
                    renderItem={renderMyTextbook}
                />
            }
            </View>
            <TouchableOpacity style = {styles.plus} onPress={()=>{{navigation.navigate('RentNewBook')}}}>
                <Ionicons name="add-circle" size={70} color="blue" backgroundColor="#fff"></Ionicons>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
	plus: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 65,
        width: 65,
        borderRadius: 100,
	},
    container: {
        height: 670,
        justifyContent:'center'
    },
    emptyListText: {
        fontSize: 15,
        alignItems: 'center',
        textAlign: 'center',
    },
    textbooksList: {
      backgroundColor:'white',
    },
    textbooksListContainer: {
      backgroundColor:'white',
      paddingVertical:8,
      marginHorizontal:10,
    },
  });



