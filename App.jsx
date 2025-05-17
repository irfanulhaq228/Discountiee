import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from './screens/SplashScreen';
import BrandsHome from './screens/Brands/HomePage';
import BrandsSignUp from './screens/Brands/BrandsSignup';
import BrandsSignIn from './screens/Brands/BrandsSignIn';
import BrandsSettings from './screens/Brands/BrandsSetting';
import BrandsDiscountAdd from './screens/Brands/BrandsDiscountAdd';
import BrandsNotifications from './screens/Brands/BrandsNotifications';

const Stack = createStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const fetchId = async () => {
      const id = await AsyncStorage.getItem('id');
      setIsAuthenticated(!!id);
    };

    fetchId();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const BrandSignupScreenWrapper = () => (
    <BrandsSignUp setIsAuthenticated={setIsAuthenticated} />
  );

  const BrandSignInScreenWrapper = () => (
    <BrandsSignIn setIsAuthenticated={setIsAuthenticated} />
  );

  const BrandHomeScreenWrapper = () => (
    <BrandsHome />
  );

  const BrandSettingScreenWrapper = () => (
    <BrandsSettings setIsAuthenticated={setIsAuthenticated} />
  );

  const BrandDiscountAddWrapper = () => (
    <BrandsDiscountAdd />
  );

  const BrandNotificationsWrapper = () => (
    <BrandsNotifications />
  );

  return (
    <ToastProvider>
      {isSplashVisible ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
              <>
                <Stack.Screen name="BrandsHome" component={BrandHomeScreenWrapper} />
                <Stack.Screen name="BrandsSetting" component={BrandSettingScreenWrapper} />
                <Stack.Screen name="BrandsDiscountAdd" component={BrandDiscountAddWrapper} />
                <Stack.Screen name="BrandsNotifications" component={BrandNotificationsWrapper} />
              </>
            ) : (
              <>
                <Stack.Screen name="BrandsSignIn" component={BrandSignInScreenWrapper} />
                <Stack.Screen name="BrandsSignUp" component={BrandSignupScreenWrapper} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </ToastProvider>
  );
};

export default App;
