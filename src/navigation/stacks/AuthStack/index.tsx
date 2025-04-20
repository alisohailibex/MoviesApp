import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MoviesListScreen from '../../../screens/MovieListScreen';
import MovieDetailScreen from '../../../screens/MovieDetailScreen';
import SignInScreen from '../../../screens/SignInScreen';
import SignUpScreen from '../../../screens/SignUpScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
