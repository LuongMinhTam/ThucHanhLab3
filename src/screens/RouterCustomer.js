import React, { useEffect, useState } from 'react'
import { useMyContextController } from '../context'
import { createStackNavigator } from '@react-navigation/stack'
import Transaction from './Transaction'
import BookService from './BookService'

const Stack = createStackNavigator();

export default RouterCustomer = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    useEffect(() => {
        if (userLogin == null)
            navigation.navigate("Login")
    }, [userLogin])

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Transaction' component={Transaction}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='BookService' component={BookService}
                options={{
                    headerTitle: 'BookService',
                    headerStyle: { backgroundColor: '#f5456e' },
                    headerTintColor: 'white'
                }}
            />
        </Stack.Navigator>
    )
}