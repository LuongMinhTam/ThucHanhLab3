import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Button, IconButton, Icon } from "react-native-paper";
import firestore from '@react-native-firebase/firestore'
import { useMyContextController } from "../context";

const Home = ({navigation}) => {
    const SERVICES = firestore().collection("SERVICES");
    const [listServices, setListServices] = useState([]);
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    useEffect(() => {
        if (userLogin == null)
            navigation.navigate("Login")
    }, [userLogin])

    useEffect(() => {
        const subcriber = firestore().collection("SERVICES").onSnapshot(querySnapshot => {
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

    const handleServiceDetail = (service) => {
        {
            userLogin.role == "admin" ? (
                navigation.navigate("RouterServices", {screen: "ServiceDetail", params : {service}})
            ) : (
                navigation.navigate("RouterCustomer", {screen: "BookService", params : {service}})
            )
        }
    }
    console.log(listServices)
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            
            <View style={{flex: 9}}>
                <View style={{alignItems: 'center'}}>
                    <Image style={{width: 200, height: 100}} source={{uri: 'https://media.loveitopcdn.com/3807/logo-coca-cola-vector-dongphucsongphu3.png'}} />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20}}>
                    <Text style={{flex: 1, fontSize: 18, fontWeight: 'bold', color: 'black'}}>Danh sách các dịch vụ</Text>
                    {
                        userLogin && userLogin.role == "admin" && (
                            <TouchableOpacity onPress={() => navigation.navigate('RouterServices', { screen: 'AddService' })}>
                                <Icon source="plus-circle" color='#f5456e' size={30} />
                            </TouchableOpacity>
                        )
                    }
                </View>
                
                <FlatList
                        data = {listServices}
                        renderItem={({item}) => (
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 10,padding: 10, borderWidth: 0.5, borderRadius: 10}}
                            onPress={() => handleServiceDetail(item)}>
                                <Text style={{flex: 1, fontSize: 18, fontWeight: 'bold', color: 'black'}}>{item.serviceName}</Text>
                                <Text style={{fontSize: 18, color: 'black'}}>{item.price}</Text>    
                            </TouchableOpacity>
                        )}
                    />
                
            </View>
        </View>
    )
}

export default Home;