import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AdminScreen from '../screens/AdminScreen';
import UserTabNavigator from './UserTabNavigator';
import { RootState } from '../store';
import SkinToneResult from '../screens/SkinToneResultScreen';
import UserHealthDetails from '../screens/UserHealthDetails';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const user = useSelector((state: RootState) => state.user.registeredUser);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  

  // Determine initial route based on login status and user type
  let initialRouteName = 'Landing';
  if (isLoggedIn && user) {
    initialRouteName = user.type === 'admin' ? 'AdminDashboard' : 'UserTabs';
  }

  
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {/* Always include all screens - just control visibility via initialRoute and navigation logic */}
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ 
          title: 'Authentication',
          headerShown: false 
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ 
          title: 'Login',
          headerShown: false 
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ 
          title: 'Sign Up',
          headerShown: false 
        }}
      />
      <Stack.Screen
        name="AdminDashboard"
        component={AdminScreen}
        options={{
          title: 'Admin Dashboard',
          headerShown: true,
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="UserTabs"
        component={UserTabNavigator}
        options={{
          headerShown: false,
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="SkinToneResult"
        component={SkinToneResult}
        options={{
          title: 'Health Analysis Results',
          headerShown: true,
          headerBackVisible: true
        }}
      />
      <Stack.Screen
        name="UserHealthDetail"
        component={UserHealthDetails}
        options={{
          title: 'User Health Detail',
          headerShown: true,
          headerBackVisible: false
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;