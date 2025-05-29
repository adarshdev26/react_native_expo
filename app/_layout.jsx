import { Stack } from 'expo-router'
import { StyleSheet, I18nManager} from 'react-native';
import i18n from '../localization/i18n';
import { useEffect } from 'react';




const RootLayout = () => {

  useEffect(() => {
    const currentLang = i18n.language;
    const shouldBeRTL = currentLang === 'ar' || currentLang === 'he';

    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      Updates.reloadAsync(); // App restart required
    }
  }, []);

  return (
   <Stack screenOptions={{
    headerStyle: {backgroundColor:'#ddd'},
    headerTintColor:'#333'
   }}
   >
   
    <Stack.Screen name='index' options={{ title: 'Home' }} />
    <Stack.Screen name='about' options={{ title: 'About' }} />
    <Stack.Screen name='contact' options={{ title: 'Contact' }} />
    <Stack.Screen name='(auth)' options={{headerShown:false}} />
    <Stack.Screen name='(dashboard)' options={{headerShown:false}} />
   </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})