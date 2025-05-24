import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Link } from 'expo-router';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>about</Text>
      <Link href='/' style={styles.link}>Back Homepage</Link>
    </View>
  )
}

export default About

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
      link:{
        marginVertical:10,
        borderBottomWidth:1
      }
})