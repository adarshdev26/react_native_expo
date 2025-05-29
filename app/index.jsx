import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  I18nManager,
  Alert,
} from 'react-native';
import React from 'react';
import logo from '../assets/images/logo.jpg';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as Updates from 'expo-updates';

const Home = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    const shouldBeRTL = newLang === 'ar';

    try {
      await i18n.changeLanguage(newLang);

      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);

        Alert.alert(
          'App will reload',
          'RTL layout change requires reloading the app.',
          [
            {
              text: 'OK',
              // onPress: async () => {
              //   await Updates.reloadAsync();
              // },
            },
          ]
        );
      }
    } catch (err) {
      console.error('Failed to change language:', err);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' },
      ]}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.welcomeText}>{t('welcome')}</Text>

        <Image source={logo} alt='logo' style={styles.img} />
        <Text style={styles.title}>The Number 1</Text>
        <Text style={styles.subtitle}>Reading List App</Text>

        <Link href='/login' style={styles.link}>
          {t('login')}
        </Link>
        <Link href='/register' style={styles.link}>
          {t('register')}
        </Link>
        <Link href='/profile' style={styles.link}>
          {t('profile')}
        </Link>

     
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    fontSize: 18,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    marginVertical: 10,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
    padding: 5,
  },
});
