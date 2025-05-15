import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import BrandsHome from './screens/Brands/HomePage';
import CategoriesScreen from './screens/Categories';
import SingleBrandScreen from './screens/SingleBrand';
import BrandsSignUp from './screens/Brands/BrandsSignup';
import BrandsSignIn from './screens/Brands/BrandsSignIn';
import BrandsSettings from './screens/Brands/BrandsSetting';
import BrandsDiscountAdd from './screens/Brands/BrandsDiscountAdd';
import BrandsNotifications from './screens/Brands/BrandsNotifications';

const Stack = createStackNavigator();

const App = () => {
  const [mode, setMode] = useState("brand");
  const [showMenu, setShowMenu] = useState(false);
  const [singleBrand, setSingleBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(1);
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

  const HomeScreenWrapper = ({ navigation }) => (
    <HomeScreen
      mode={mode}
      setMode={setMode}
      showMenu={showMenu}
      navigation={navigation}
      setShowMenu={setShowMenu}
      setSingleBrand={setSingleBrand}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );

  const SingleBrandScreenWrapper = ({ navigation }) => (
    <SingleBrandScreen
      mode={mode}
      setMode={setMode}
      showMenu={showMenu}
      navigation={navigation}
      setShowMenu={setShowMenu}
      singleBrand={singleBrand}
      setSingleBrand={setSingleBrand}
    />
  );

  const CategoriesScreenWrapper = ({ navigation }) => (
    <CategoriesScreen
      mode={mode}
      setMode={setMode}
      showMenu={showMenu}
      navigation={navigation}
      setShowMenu={setShowMenu}
      setSingleBrand={setSingleBrand}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );

  const BrandSignupScreenWrapper = () => (
    <BrandsSignUp setIsAuthenticated={setIsAuthenticated} />
  );

  const BrandSignInScreenWrapper = () => (
    <BrandsSignIn setIsAuthenticated={setIsAuthenticated} />
  );

  const BrandHomeScreenWrapper = ({ navigation }) => (
    <BrandsHome
      mode={mode}
      setMode={setMode}
      showMenu={showMenu}
      navigation={navigation}
      setShowMenu={setShowMenu}
      setSingleBrand={setSingleBrand}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );

  const BrandSettingScreenWrapper = ({ navigation }) => (
    <BrandsSettings
      mode={mode}
      setMode={setMode}
      showMenu={showMenu}
      navigation={navigation}
      setShowMenu={setShowMenu}
      setSingleBrand={setSingleBrand}
      selectedCategory={selectedCategory}
      setIsAuthenticated={setIsAuthenticated}
      setSelectedCategory={setSelectedCategory}
    />
  );

  const BrandDiscountAddWrapper = ({ navigation }) => (
    <BrandsDiscountAdd
      mode={mode}
      setMode={setMode}
      showMenu={showMenu}
      navigation={navigation}
      setShowMenu={setShowMenu}
      setSingleBrand={setSingleBrand}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );

  const BrandNotificationsWrapper = ({ navigation }) => (
    <BrandsNotifications
      mode={mode}
      setMode={setMode}
      showMenu={showMenu}
      navigation={navigation}
      setShowMenu={setShowMenu}
      setSingleBrand={setSingleBrand}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
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
                <Stack.Screen name="Home" component={HomeScreenWrapper} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Categories" component={CategoriesScreenWrapper} />
                <Stack.Screen name="Brands" component={SingleBrandScreenWrapper} />
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
