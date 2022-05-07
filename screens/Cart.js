import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { CartContext } from '../CartContext';
export default function Cart ({navigation}) {
const {items, getTotalPrice} = useContext (CartContext);

  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
     setTotal(getTotalPrice());
    });
  
  return (
    <View style = {styles.cartLineTotal}>
      <Text style = {[styles.lineLeft, styles.lineTotal]}>Total</Text>
      <Text style = {styles.lineRight}>$ {total}</Text>
    </View>
  );
}

function renderItem({item}) {
  return (
  <View style = {styles.itemsListContainer}>
    <View style= {styles.header_container}>
        <Text style = {styles.name_header}> {item.textbook.name} x {item.duration} hours </Text> 
        <Text style = {styles.text}> Author: {item.textbook.author} </Text>
    </View>
    <View style= {styles.content_container}>
      <View style= {styles.image_container}>
          <Image style = {styles.textbook_image} source ={{uri: item.textbook.image}}/> 
      </View>   
      <View style= {styles.text_container}>
          <Text> Date: {item.start_date.getMonth()+ 1 +"/"+(item.start_date.getDate())+"/"+item.start_date.getFullYear()} </Text>
          <Text> Time: {item.start_date.getHours()+":"+item.start_date.getMinutes()} to {item.end_date.getHours()+":"+item.end_date.getMinutes()} </Text>
          <Text> Total Price: ${item.totalPrice} </Text>
      </View>
    </View>
  </View>  
  );
}



return (
  <SafeAreaView style = {{height: 650}}>
    <FlatList
      style={styles.itemsList}
      contentcontainerstyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
      ListFooterComponent={Totals}
    />
    <TouchableOpacity style = {styles.continue_container}
      onPress = {() => {
          navigation.navigate('TextbooksList');
      }}
    >
      <Text style={styles.continue_text}>Continue shopping </Text>
    </TouchableOpacity>

    <TouchableOpacity style = {styles.continue_container}
      onPress = {() => {
          navigation.navigate('Checkout', {
            items: items,
          });
      }}
    >
      <Text style={styles.continue_text}>Checkout </Text>
    </TouchableOpacity>
  </SafeAreaView>

  
  );
}

const styles = StyleSheet.create({
  cartlineTotal: {
    flexDirection: 'row',
    borderTopColor: '#ccc',
    borderTopWidth: 2
  },
  lineTotal: {
    fontWeight: 'bold',
  },
  lineLeft: {
    fontSize: 18,
    lineHeight: 35,
    color:'#000'
  },
  lineRight: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 35,
    color: '#000',
    textAlign: 'right'
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
  },
  continue_text: {
    color: 'white',
    fontWeight: 'normal',
  },

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
    width: 60,
}
});
