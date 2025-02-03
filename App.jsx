import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import CategoriesScreen from './screens/Categories';
import SingleBrandScreen from './screens/SingleBrand';
import BrandsSignUp from './screens/Brands/BrandsSignup';
import BrandsSignIn from './screens/Brands/BrandsSignIn';

const Stack = createStackNavigator();

function App() {
  const [mode, setMode] = useState("user");
  const [showMenu, setShowMenu] = useState(false);
  const [singleBrand, setSingleBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

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

  const BrandSignupScreenWrapper = ({ navigation }) => (
    <BrandsSignUp
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

  const BrandSignInScreenWrapper = ({ navigation }) => (
    <BrandsSignIn
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
    <>
      {isSplashVisible ? <SplashScreen /> : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreenWrapper} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Categories" component={CategoriesScreenWrapper} />
            <Stack.Screen name="Brands" component={SingleBrandScreenWrapper} />
            <Stack.Screen name="BrandsSignUp" component={BrandSignupScreenWrapper} />
            <Stack.Screen name="BrandsSignIn" component={BrandSignInScreenWrapper} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
