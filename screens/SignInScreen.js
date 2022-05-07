import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {signIn} from '../API/firebaseMethods';

export function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = async () => {
    if (!email) {
      Alert.alert('Email field is required.');
    }

    if (!password) {
      Alert.alert('Password field is required.');
    }

    const signedIn  = await signIn(email, password)
    console.log('signedIn', signedIn)
    if (signedIn){
      setEmail('');
      setPassword('');
      navigation.navigate('BottomTap');
    } else {
      Alert.alert('Incorrect email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign in to your account:</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter your password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.inlineText}>Do not have an account?</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 5,
    backgroundColor: 'navy',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: "2%",
  },
  buttonText: {
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#B0C4DE',
    alignItems: 'center',
    justifyContent: 'center',
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
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center',
    marginTop: '5%',
    marginBottom:15
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center',
    marginTop: '5%',
    marginBottom:15
  },
});
