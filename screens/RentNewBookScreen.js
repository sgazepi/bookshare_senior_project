import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase/compat';

import { register_new_textbook } from '../services/TextbookService.js';


export default function RentNewBookScreen ({navigation}) {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    

  const emptyState = () => {
    setName('');
    setAuthor('');
    setDescription('');
    setPrice('');
    setImage(null);
  };

  const selectImage = async () => { 
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async (filename) => { 
    const uri = image;
    console.log(filename);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(filename);
    await ref.put(blob);
  }

  const handlePress = async () => {
    if (!name) {
      Alert.alert('Book name is required');
    } else if (!author) {
      Alert.alert('Author name field is required.');
    } else if (!description) {
      Alert.alert('Description field is required.');
    } else if (!price) {
      Alert.alert('Minimum Bid field is required.');
    } else if (!image){
      Alert.alert('Image field is required.');
    } else {
      const imageURL = image.substring(image.lastIndexOf('/') + 1);
      try {
        await uploadImage(imageURL);
        await register_new_textbook (
          name,
          author,
          description,
          price,
          imageURL
        );
        emptyState(); 
        navigation.navigate('BottomTap');
      } 
      catch (err) {
        console.error(err);
        alert("An error occured while adding new textbook");
    }
  }
}

return (
    <SafeAreaView>
        <View style={styles.container}>
        <Text style={styles.text}>Rent out a book </Text>
        <ScrollView onBlur={Keyboard.dismiss}>
        <TextInput
            style={styles.textInput}
            placeholder="Book Name*"
            value={name}
            onChangeText={(name) => setName(name)}
        />
        <TextInput
            style={styles.textInput}
            placeholder="Author Name*"
            value={author}
            onChangeText={(author) => setAuthor(author)}
        />
        <TextInput
            style={styles.textDescriptionInput}
            placeholder="Description*: e.g. condition, original price, etc."
            value={description}
            multiline={true}
            onChangeText={(description) => setDescription(description)}
        />
        <TextInput
            style={styles.textInput}
            placeholder="Minimum Bid Price*"
            value={price}
            keyboardType="numeric"
            onChangeText={(price) => setPrice(price)}
        />
        <TouchableOpacity style={styles.textInput} onPress={selectImage}>
          <Text style={styles.buttonText}>Pick an image</Text>
        </TouchableOpacity>
          {image !== null ? (
          <Image source={{ uri: image }} style={styles.imageBox}  />
        ) : null}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
          
        
        </View>
    </SafeAreaView>
);
}
    
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#B0C4DE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        padding: 5,
        backgroundColor: '#2E6194',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 15,
        alignSelf: 'center',
        margin: '5%',
    },
    buttonText: {
      fontSize:20,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      textAlign: 'center',
      fontSize: 25,
      margin: '5%',
      marginTop:'15%',
      fontWeight: 'bold',
      color: '#2E6194',
    },
    textInput: {
      width: 300,
      fontSize:18,
      borderWidth: 1,
      borderColor:'grey',
      padding: 10,
      margin: 5,
      borderRadius:10,
    },
    textDescriptionInput: {
      width: 300,
      fontSize:18,
      borderWidth: 1,
      borderColor:'grey',
      padding: 10,
      margin: 5,
      borderRadius:10,
      height:100,
    },
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 300,
      height: 300
    }
});
