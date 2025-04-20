import {NavigationContainer} from '@react-navigation/native';
import './gesture-handler';
import React, {useState} from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';

import AuthStack from './src/navigation/stacks/AuthStack';
import {MMKV} from 'react-native-mmkv';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ToastMessage from './src/utils/theme/toast';
import BottomNavigation from './src/navigation/BottomTab';
import {AuthConsumer, AuthProvider} from './src/context/Auth/auth';

export const storage = new MMKV();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthConsumer>
            {auth => {
              return !auth?.isAuthenticated ? (
                <NavigationContainer>
                  <AuthStack />
                </NavigationContainer>
              ) : (
                <NavigationContainer>
                  {auth?.isAuthenticated && auth?.user?.token ? (
                    <BottomNavigation />
                  ) : (
                    <AuthStack />
                  )}
                </NavigationContainer>
              );
            }}
          </AuthConsumer>
        </AuthProvider>
      </QueryClientProvider>
      <ToastMessage />
    </SafeAreaView>
  );
}

export default App;
