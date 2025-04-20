import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Input from '../components/Input';
import {responsive} from '../utils/theme/responsive';
import MainLayout from '../components/MainLayout';
import PrimaryButton from '../components/PrimaryButton';
import Typography from '../components/Typography';
import {useSignInMutation} from '../services/Auth/SignIn';
import {isValidEmail} from '../utils/helper';
import Toast from 'react-native-toast-message';
import {useAuth} from '../context/use-auth';

const SignInScreen = ({navigation}: any) => {
  const {login} = useAuth();

  const [email, setEmail] = useState<string>('eve.holt@reqres.in');
  const [password, setPassword] = useState<string>('pistol');

  const {mutate: signInFn, isPending, isError} = useSignInMutation();

  const signIn = () => {
    if (!isValidEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: 'Please write Valid Email',
      });
      return;
    }
    if (password === '') {
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: 'Please enter password',
      });
      return;
    }

    let payload = {
      email: email,
      password: password,
    };

    signInFn(payload, {
      onSuccess: res => {
        login({
          ...res,
          isAuthenticated: true,
        });
      },
      onError: err => {
        console.log('ERR', err);
      },
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{flexGrow: 1}}>
        <MainLayout verticalPadding sidePadding>
          <Input
            placeholder="John@email.com"
            label="Email"
            style={{marginBottom: responsive(24)}}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Input
            placeholder="*******"
            label="Password"
            style={{marginBottom: responsive(24)}}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <PrimaryButton onPress={signIn}>
            <Typography align="center" color="white">
              Sign In
            </Typography>
          </PrimaryButton>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: responsive(24),
              alignSelf: 'center',
            }}>
            <Typography align="center" color="black">
              Don't have an account?
            </Typography>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Typography align="center"> Create One</Typography>
            </TouchableOpacity>
          </View>
        </MainLayout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
