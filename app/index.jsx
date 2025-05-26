import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react';
import logo from '../assets/images/logo.jpg';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View style={styles.container}>

      <Image source={logo} alt='logo' style={styles.img} />

      <Text style={styles.title}>The Number 1</Text>
      <Text style={{marginTop:10, marginBottom:10}}>Reading List App</Text>
      <Link href='/login' style={styles.link}>Login Page</Link>
      <Link href='/register' style={styles.link}>Register Page</Link>
    </View>
  )
}

export default Home


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize:18,
    fontWeight:'bold'
  },
  img:{
    marginVertical:10
  },
  link:{
    marginVertical:10,
    borderBottomWidth:1
  }
})

