import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

const AuthLayout = () => {

  return (
   <>
   <StatusBar barStyle='auto' />
   <Stack screenOptions={{
    headerStyle: {backgroundColor:'#ddd'},
    headerTintColor:'#333',
    headerShown:false
   }}
   />
   </>
  )
}

export default AuthLayout

