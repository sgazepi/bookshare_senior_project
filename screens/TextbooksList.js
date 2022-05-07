import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Textbook } from '../components/Textbook.js';
import { getTextbooks } from '../services/TextbookService.js';

export default function TextbooksList ({navigation}) {
  function renderTextbook({item: textbook}) {
    return (
      <Textbook {...textbook}
      onPress={()=>{
        navigation.navigate('TextbookDetails', {
          textbookId: textbook.book_id,
        });
      }}
      />
    );
  }

const [textbooks, setTextbooks] = useState([]);

const fetchTextbooks = async () => {
  try {
    const textbooks = await getTextbooks();
    setTextbooks (textbooks);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching textbooks data");
      }
};

useEffect(() => {
  fetchTextbooks();
}, []);

return (
  <View style = {styles.container}>
  {textbooks.length === 0
    ? <Text style = {styles.emptyListText}> No textbooks currently available </Text>
    :<FlatList
      style={styles.textbooksList}
      contentContainerStyle={styles.textbooksListContainer}
      keyExtractor={(item) => item.book_id.toString()}
      data={textbooks}
      renderItem={renderTextbook}
    />
  }
  </View>
);
}

const styles = StyleSheet.create({
  textbooksList: {
    backgroundColor:'white',
  },
  textbooksListContainer: {
    backgroundColor:'white',
    paddingVertical:8,
    marginHorizontal:10,
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
});