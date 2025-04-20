import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import MoviesStack from '../stacks/MoviesListStack';
import FavoritesStack from '../stacks/FavoritesStack';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={MoviesStack}
        options={{
          headerShown: false,
          title: 'Movies',
          tabBarIcon: ({color, size}) => (
            <Icon name="film" size={16} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{
          headerShown: false,
          title: 'Favorites',
          tabBarIcon: ({color, size}) => (
            <Icon name="heart" size={16} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
