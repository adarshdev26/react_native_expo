import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const create = () => {
  return (
    <View style={styles.container}>
      <Text>create</Text>
    </View>
  )
}

export default create

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#52357B'
  }
})