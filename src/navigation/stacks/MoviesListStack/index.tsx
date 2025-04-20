import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MoviesListScreen from '../../../screens/MovieListScreen';
import MovieDetailScreen from '../../../screens/MovieDetailScreen';

const Stack = createStackNavigator();

const MoviesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MoviesListScreen" component={MoviesListScreen} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
};

export default MoviesStack;
