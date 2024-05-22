import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, Text } from 'react-native-paper'
import { useMyContextController } from '../context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Setting from './Setting';
import Home from './Home';
import Customer from './Customer';
const Tab = createBottomTabNavigator();

const Admin = () => {

  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#f5456e'
      }}
    >
      <Tab.Screen name={userLogin ? userLogin.name : "admin"} component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (<Icon
            source="home"
            color={color}
            size={size}
          />
          ),
          headerRight: () => (
            <View style={{ paddingRight: 10 }}>
              <Icon source="account-circle" size={30} color='white' />
            </View>
          ),
          headerStyle: {backgroundColor: '#f5456e'},
          headerTintColor: 'white'
        }}
      />
      
      <Tab.Screen name="Customer" component={Customer}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({ color, size }) => (<Icon
            source="account-multiple"
            color={color}
            size={size}
          />
          ),
          headerRight: () => (
            <View style={{ paddingRight: 10 }}>
              <Icon source="account-circle" size={30} color='white' />
            </View>
          ),
          headerStyle: {backgroundColor: '#f5456e'},
          headerTintColor: 'white'
        }}
    
      />
      <Tab.Screen name="Setting" component={Setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (<Icon
            source="cog-outline"
            color={color}
            size={size}
          />
          ),
          headerStyle: {backgroundColor: '#f5456e'},
          headerTintColor: 'white'
        }}
      />
    </Tab.Navigator>
  );
};

export default Admin