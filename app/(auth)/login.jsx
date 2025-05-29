import { TextInput, View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, ActivityIndicator, ScrollView} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from 'expo-router';
import * as SmsRetriever from 'expo-sms-retriever';


const LoginScreen = () => {

  const [expotoken, setExpotoken] = useState('');
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [emailOrPhoneError, setEmailOrPhoneError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const navigation = useNavigation();


  useEffect(() => {
    const fetchexpotoken = async () => {
      try {
        const expotoken = await AsyncStorage.getItem('expoPushToken');
        setExpotoken(expotoken);
        console.log(expotoken, 'this is token...')
      } catch (error) {
        console.error(error, 'no token recived')
      }
    }
    fetchexpotoken()
  }, [])


  useEffect(() => {
    // Hide bottom tab bar when screen is active
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    navigation.setOptions({ title: "Login" });
    return () => {
      // Restore bottom tab bar when leaving the screen
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation]);



  //logged in not able to back to login screen....
  useFocusEffect(
    useCallback(() => {
      const checkIfLogin = async () => {
        try {
          setLoading(true);
          const userData = await AsyncStorage.getItem('logindetails');
          const expotoken = await AsyncStorage.getItem('expoPushToken');
          setExpotoken(expotoken);
          // console.log(expotoken , 'this is token...')
          if (userData) {
            router.replace('/');
          }
        } catch (error) {
          console.error('Error checking login status', error);
        } finally {
          setLoading(false);
        }
      };

      checkIfLogin();
    }, [])
  );

  const startListeningForOTP = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          const message = event.message;
          const otpMatch = message.match(/^(\d{4})/);
          if (otpMatch) {
            setOtp(otpMatch[1]); // otpMatch[1] is '4253' from your example
            SmsRetriever.removeSmsListener();
          }
        });
        
      }
    } catch (error) {
      console.log('SMS Retriever error:', error);
    }
  };
  useEffect(() => {
    return () => {
      SmsRetriever.removeSmsListener();
    };
  }, []);
  

  // Function to request OTP
  const handleRequestOTP = async () => {
    let isValid = true;

    if (!emailOrPhone) {
      setEmailOrPhoneError("Please enter a valid email or phone");
      isValid = false;
    } else if (emailOrPhone && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone) && emailOrPhone.length < 3) {
      setEmailOrPhoneError("Invalid email or phone number.");
      isValid = false;
    } else {
      setEmailOrPhoneError('');
    }

    if (!isValid) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://chago.in/wp-json/my-api/v1/login_with_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: emailOrPhone, token: expotoken }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setErrorMessage('');
        startListeningForOTP();
      } else {
        setErrorMessage(data.message || 'Failed to send OTP.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to verify OTP
  const handleVerifyOTP = async () => {
    if (otp.length !== 4) {
      setErrorMessage("Please enter a valid 4-digit OTP.");
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('phone', emailOrPhone);
      formData.append('otp', otp);
      const response = await fetch('https://chago.in/wp-json/my-api/v1/verify_otp_set', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok || data.status == true) {
        await AsyncStorage.setItem('logindetails', JSON.stringify(data));
        const redirectUrl = await AsyncStorage.getItem('redirectAfterLogin');
        const targetRoute = redirectUrl || '/Settings';
        setTimeout(async () => {
          router.push(targetRoute);
          await AsyncStorage.removeItem('redirectAfterLogin');
        }, 1000);

      } else {
        setErrorMessage(data.message || 'Invalid OTP.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to resend OTP
  const handleResendOTP = async () => {
    setResendLoading(true);
    setResendMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('https://chago.in/wp-json/my-api/v1/resend_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: emailOrPhone }),
      });

      const data = await response.json();
      if (response.ok) {
        setResendMessage('A new OTP has been sent to your phone.');
      } else {
        setErrorMessage(data.message || 'Failed to resend OTP.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Try again later.');
    } finally {
      setResendLoading(false);
    }
  };




  return (

    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
        
        </View>
        <View>
       
          {/* <Text>{expotoken ? expotoken.toString() : 'No token yet'}</Text> */}
        </View>
        <ImageBackground style={styles.form_BG}>
          <View style={styles.loginContainer}>
            {!otpSent ? (
              <>
                <Text style={styles.header}>Enter your Registered Email or Phone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email/Mobile Number"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  value={emailOrPhone}
                  onChangeText={setEmailOrPhone}
                />
                {emailOrPhoneError ? <Text style={styles.errorText}>{emailOrPhoneError}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleRequestOTP} disabled={loading}>
                  <Text style={styles.buttonText}>{loading ? 'Sending OTP...' : 'Request OTP'}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.header}>Enter the 4-digit OTP</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={4}
                  value={otp}
                  onChangeText={setOtp}
                />
                <TouchableOpacity style={styles.button} onPress={handleVerifyOTP} disabled={loading}>
                  <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify OTP'}</Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={handleResendOTP} disabled={resendLoading}>
                  <Text style={styles.resendtext}>{resendLoading ? <ActivityIndicator size="large" color="#007BFF" /> : 'Not received your code? Resend code'}</Text>
                </TouchableOpacity>
              </>
            )}
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    backgroundColor: '#59A8E5',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: '100%',
  },
  headerContainer: {
    backgroundColor: '#59A8E5',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
  },
  form_BG: {
    backgroundColor: '#fff',
    paddingBottom: 180,
  },
  logo: {
    width: 221,
    height: 90,
    maxWidth: '100%',
  },
  header: {
    marginTop: 80,
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 20,
    color: '#2B2B2B',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#EBF6FE',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#2B2B2B',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendtext: { fontSize: 16, textAlign: 'center', paddingTop: 15 },
  errorText: {
    marginTop: 20,
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
  successText: {
    marginTop: 10,
    color: 'green',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default LoginScreen;
