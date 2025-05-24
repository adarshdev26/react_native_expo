import { Stack } from 'expo-router'
import { StyleSheet} from 'react-native'

const RootLayout = () => {
  return (
   <Stack screenOptions={{
    headerStyle: {backgroundColor:'#ddd'},
    headerTintColor:'#333'
   }}
   >
    <Stack.Screen name='index' options={{ title: 'Home' }} />
    <Stack.Screen name='about' options={{ title: 'About' }} />
    <Stack.Screen name='contact' options={{ title: 'Contact' }} />
   </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})