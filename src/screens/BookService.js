import { Alert, Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../context';
import DatePicker from 'react-native-date-picker';

const BookService = ({ navigation, route }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const { service } = route.params;
    const [listService, setListService] = useState({});
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const SERVICES = firestore().collection('SERVICES');
    const BOOKSERVICES = firestore().collection('BOOKSERVICES');

    useEffect(() => {
        if (userLogin == null) {
            navigation.navigate("Login");
        }
    }, [userLogin]);

    useEffect(() => {
        if (service) {
            const unsubscribe = SERVICES.doc(service.id).onSnapshot(response => {
                if (response.exists) {
                    setListService(response.data());
                } else {
                    console.log('Service not found!');
                }
            });
            return () => unsubscribe();
        }
    }, [service]);

    const handleAddNewAppointment = async () => {
        if (!userLogin || !service) {
            Alert.alert("Missing user or service information");
            return;
        }

        const data = {
            id_customer: userLogin.email,
            id_services: service.id,
            time: date
        };
        try {
            await BOOKSERVICES.add(data);
            Alert.alert("Add new appointment successfully!");
            navigation.navigate('Customer');
        } catch (e) {
            Alert.alert("Add new appointment fail", e.message);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {listService.image && listService.image !== '' ? (
                <Image source={{ uri: listService.image }}
                    resizeMode='cover'
                    style={{ height: 300, width: 400 }}
                />
            ) : null}
            <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>
                Service Name: <Text style={{ fontSize: 20 }}>{listService.serviceName}</Text>
            </Text>
            <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>
                Price: <Text style={{ fontSize: 20 }}>{listService.price}</Text>
            </Text>
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <TextInput
                    label="Time"
                    disabled
                    style={{ flex: 9 }}
                    value={date.toString()}
                    mode='flat'
                />
                <Button mode='contained' style={{ flex: 1, justifyContent: 'center' }} buttonColor='#f5456e' onPress={() => setOpen(true)}>Pick</Button>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode='datetime'
                    onConfirm={(selectedDate) => {
                        setOpen(false);
                        setDate(selectedDate);
                    }}
                    onCancel={() => setOpen(false)}
                />
            </View>
            <Button mode='contained' style={{ margin: 10, justifyContent: 'center', height: 50, }} buttonColor='#f5456e' onPress={handleAddNewAppointment}>
                Book service
            </Button>
        </View>
    );
};

export default BookService;
