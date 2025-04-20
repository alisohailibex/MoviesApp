import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MoviesListScreen from '../../../screens/MovieListScreen';
import MovieDetailScreen from '../../../screens/MovieDetailScreen';
import FavoritesScreen from '../../../screens/FavoritesScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
