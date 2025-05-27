import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react'

const login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleSubmit = () => {
    console.log('form submitted', email, password)
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to your account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={{
            height: 40,
            padding: 10,
            borderWidth: 1,
            borderColor: 'gray',
            width: 250,
            borderRadius: 5
          }}
          keyboardType='email-address'
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={{
            height: 40,
            padding: 10,
            borderWidth: 1,
            borderColor: 'gray',
            width: 250,
            borderRadius: 5
          }}
          placeholder="Password"
          value={password}
          onChange={setPassword}
          secureTextEntry
        />
      </View>

      <View >
        <TouchableOpacity style={styles.btnContainer} onPress={HandleSubmit}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.linkContainer}>
        <Link href='/register'><Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Register New User</Text></Link>
      </View>
    </View>
  )
}

export default login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 15,
    fontWeight: 700,
  },
  inputContainer: {
    marginVertical: 10
  },
  label: {
    color: '000',
    fontWeight: 500
  },
  btnContainer: {
    width: 200,
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 5,

  },
  btnText: {
    color: '#fff',
    textAlign: 'center'
  }
})