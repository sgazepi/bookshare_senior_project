import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export function HomeScreen ({navigation}) {
  return (
    <View style = {{backgroundColor:'#B0C4DE', height: 900}}>
    <View style={styles.titleContainer}>
      <Text style={styles.header}> Welcome to Bookshare </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')} >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.inlineText}>Already have an account?</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: 'navy',
    padding: 5,
    margin: '2%'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center',
    marginTop: '1%',
    marginBottom: 50,
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center',
    marginTop: '5%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 250,
  },
});