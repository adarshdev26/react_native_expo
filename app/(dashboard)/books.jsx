import { StyleSheet, Text, View, SafeAreaView} from 'react-native'


const books = () => {
  return (
   <View style={styles.container}>
      <Text>books</Text>
    </View>
  )
}

export default books

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
   justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#52357B'
  }
})