import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MainLayout from '../components/MainLayout';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import {responsive} from '../utils/theme/responsive';
import Typography from '../components/Typography';
import {useState} from 'react';
import {useSignUpMutation} from '../services/Auth/SignUp';
import {isValidEmail} from '../utils/helper';
import Toast from 'react-native-toast-message';
import {storage} from '../../App';
import {useAuth} from '../context/use-auth';

const SignUpScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('eve.holt@reqres.in');
  const [password, setPassword] = useState<string>('pistol');

  const {login} = useAuth();

  const {mutate: signUpFn, isPending, isError} = useSignUpMutation();

  const signUp = () => {
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

    signUpFn(payload, {
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
          <PrimaryButton onPress={signUp}>
            <Typography align="center" color="white">
              Sign Up
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
              Already have an account?
            </Typography>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Typography align="center"> Sign In</Typography>
            </TouchableOpacity>
          </View>
        </MainLayout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
