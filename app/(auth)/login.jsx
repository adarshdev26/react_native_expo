import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

const login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>login to your account</Text>

      <View style={styles.linkContainer}>
        <Link href='/register'><Text>Register New User</Text></Link>
      </View>
    </View>
  )
}

export default login

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize:15,
        fontWeight:400,
    }
})