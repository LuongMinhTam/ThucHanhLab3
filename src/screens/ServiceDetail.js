import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'


const ServiceDetail = ({navigation, route }) => {
    const { service } = route.params;
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const formatDate = (timestamp) => {
        if (timestamp && timestamp._seconds) {
            const date =  new Date(timestamp._seconds * 1000);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }
        return '';
    };
    
    console.log("Service object received in ServiceDetail:", service);

    const handleUpdate = (serviceItem) => {
        navigation.navigate("ServiceUpdate", {service: serviceItem}) 
        
    }
    const handleDelete = (serviceId) => {
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
                            navigation.navigate('Home');
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
    }

    return (
        <View style={{ flex: 1}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Service name: {service.serviceName}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold'  }}>Price: {service.price}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold'  }}>Creator: {service.creator}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold'  }}>Time: {formatDate(service.time)}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold'  }}>Final update: {formatDate(service.finalUpdate)}</Text>
            <Image source={{uri: service.image}}
                resizeMode="contain"
                style={{height: 300, width: 400, alignItems: 'center', marginTop: 20}}
            /> 
            <View style={{justifyContent: 'center', marginTop: 50, }}>
                <Button mode="contained-tonal" onPress={() => handleUpdate(service)}
                    style={{margin: 10, padding: 5}}
                    labelStyle={{fontSize: 20}}
                >
                    Update service
                </Button>
                <Button mode="contained-tonal" onPress={() => handleDelete(service.id)}
                    style={{margin: 10, padding: 5}}
                    labelStyle={{fontSize: 20}}
                >
                    Delete
                </Button>
            </View> 
        </View>
    );
};

export default ServiceDetail;