import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../context';


function Transaction({navigation}) {
    const BOOKSERVICES = firestore().collection("BOOKSERVICES");
    const [listServices, setListServices] = useState([]);
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    useEffect(() => {
        if (userLogin == null)
            navigation.navigate("Login")
    }, [userLogin])

    useEffect(() => {
        const subcriber = firestore().collection("BOOKSERVICES").onSnapshot(querySnapshot => {
            const services = [];

            querySnapshot.forEach(documentSnapshot => {
                services.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            setListServices(services);
        });
        return () => subcriber();
    }, [])

  return (
    <View>
         <FlatList
            data = {listServices}
            renderItem={({item}) => (
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 10,padding: 10, borderWidth: 0.5, borderRadius: 10}}>
                    <Text style={{flex: 1, fontSize: 18, fontWeight: 'bold', color: 'black'}}>{item.serviceName}</Text>
                    <Text style={{fontSize: 18, color: 'black'}}>{item.price}</Text>    
                </TouchableOpacity>
            )}
        />
    </View>
  )
}

export default Transaction