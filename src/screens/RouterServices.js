import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../context";
import { useEffect, useState } from "react";
import Services from "./Services"
import AddService from "./AddService";
import ServiceDetail from './ServiceDetail'
import { Appbar, Menu } from "react-native-paper";
import { Alert, Button, Text } from "react-native";
import ServiceUpdate from "./ServiceUpdate";
import firestore from '@react-native-firebase/firestore'


const Stack = createStackNavigator();
export default RouterServices = ({navigation, route}) => {
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    const [visible, setVisible] = useState(false);
    const service = route.params?.service;
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    useEffect(() => {
        if(userLogin == null){
            navigation.navigate("Login")
        }
    }, [userLogin])

    const deleteService = (serviceId) => {
        if (!serviceId) {
            Alert.alert('Error', 'Service ID is not available.');
            console.log("sss" + service); 
            return;
        }

        Alert.alert(
            'Warning',
            'Are you sure you want to remove this service? this operation cannot be returned',
            [
                {
                    text: 'Cancel',
                    onPress: () => closeMenu(),
                    style: 'cancle',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        firestore().collection('SERVICES').doc(serviceId).delete()
                        .then(() => {
                            Alert.alert('Service deleted!', 'The service has been deleted successfully.')
                            console.log(serviceId)
                            console.log(service)
                        })
                        .catch(error => {
                            console.error("Error deleting service", error);
                            Alert.alert('Error', 'Failed to delete the service.');
                        });
                        closeMenu();
                    },
                    style: 'destructive'
                },
            ],
            {cancelable: false}
        );
    };

    return (
        <Stack.Navigator initialRouteName="AddService">
            <Stack.Screen name="AddService" component={AddService} options={{headerStyle: {backgroundColor: '#e63268'}}}/>

            <Stack.Screen name="ServiceDetail" component={ServiceDetail} options={({navigation}) => ({
                headerStyle: {backgroundColor: '#e63268'},
                headerRight: () => (
                    <Menu 
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <Appbar.Action
                                icon="dots-vertical"
                                onPress={openMenu}
                        />
                        }>
                        <Menu.Item onPress={() => {navigation.navigate('ServiceUpdate')}}  title="Update" />
                        <Menu.Item onPress={() => {deleteService(service?.id)}}  title="Delete service" />
                    </Menu>
                )
            })}/>
            <Stack.Screen name="ServiceUpdate" component={ServiceUpdate} options={{headerStyle: {backgroundColor: '#e63268'}}}/>

        </Stack.Navigator>
    )
}