import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native'
import { Link } from 'expo-router';
import { useState } from 'react';

const register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')


  const HandleSubmit =  () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    console.log('submitted', email, password)
  }

  return (
    <View style={styles.container}>
      <Text>register</Text>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error && <Text style={{ color: 'red', paddingVertical: 10 }}>{error}</Text>}
      </View>



      <TouchableOpacity style={styles.btnContainer} onPress={HandleSubmit}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Link href='/login'><Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Already Registered Login</Text></Link>
      </View>
    </View>
  )
}

export default register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  inputContainer: {
    marginVertical: 10
  },
  label: {
    color: '#000',
    fontWeight: '500'
  },
  input: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: 250,
    borderRadius: 5
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