import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, View, Text } from 'react-native';
import UserScreen from '../screens/UserScreen';
import UploadScreen from '../screens/UploadScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, iconText, label }) => (
  <View style={{
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 40,
  }}>
    <View style={{
      backgroundColor: focused ? '#E6F3FF' : 'transparent',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginBottom: 2,
    }}>
      <Text style={{
        fontSize: 18,
        color: focused ? '#3182CE' : '#6B7280',
        fontWeight: focused ? 'bold' : 'normal',
      }}>
        {iconText}
      </Text>
    </View>
  </View>
);

const UserTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Screen') {
          return <TabIcon focused={focused} iconText="⚕️" label="Health Scan" />;
        } else if (route.name === 'Upload') {
          return <TabIcon focused={focused} iconText="📊" label="Reports" />;
        }
      },
      tabBarActiveTintColor: '#3182CE',
      tabBarInactiveTintColor: '#6B7280',
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: -5,
        marginBottom: Platform.OS === 'ios' ? 0 : 5,
      },
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        height: Platform.OS === 'ios' ? 90 : 70,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 34 : 10,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      tabBarItemStyle: {
        paddingVertical: 5,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="Screen" 
      component={UserScreen}
      options={{
        tabBarLabel: 'Health Scan',
        tabBarAccessibilityLabel: 'Health Monitoring and Vital Signs',
      }}
    />
    <Tab.Screen 
      name="Upload" 
      component={UploadScreen}
      options={{
        tabBarLabel: 'Reports',
        tabBarAccessibilityLabel: 'Health Reports and Analysis History',
      }}
    />
  </Tab.Navigator>
);

export default UserTabNavigator;
