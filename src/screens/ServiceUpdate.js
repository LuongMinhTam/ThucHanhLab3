import { useEffect, useState } from "react"
import { useMyContextController } from "../context";
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { Alert, Image, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker';



export default ServiceUpdate = ({navigation, route}) => {
    const [listService, setListService] = useState([]);
    const [pathImage, setPathImage] = useState(null);
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    const {service} = route.params;
    console.log("update test: " + service.id)
    const SERVICES = firestore().collection("SERVICES");

  useEffect(() => {
    if (userLogin == null)
      navigation.navigate("Login")
  }, [userLogin])

  useEffect(() => {
    const unsubscribe = SERVICES.doc(service.id).onSnapshot(response => {
      setListService(response.data());
      setPathImage(response.data().image);
  });
  

  return () => unsubscribe();
  }, [service.id])

    const formatPrice = (value) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR'
        }).format(value);

        const handleUpdateServices = async () => {
          if (!listService.serviceName || !listService.price || !pathImage) {
              Alert.alert('Vui lòng nhập đầy đủ thông tin');
          } else {
              try {
                  const ref = storage().ref(`/services/${listService.id}.png`);
                  await ref.putFile(pathImage);
                  const link = await ref.getDownloadURL();
                  await SERVICES.doc(listService.id).update({ ...listService, image: link });
                  console.log("Updated service");
                  navigation.navigate("Admin");
              } catch (error) {
                  console.log(error.message);
              }
          }
      };
      const uploadImage = () => {
        ImagePicker.openPicker({
            cropping: true,
            width: 300, 
            height: 400,
            mediaType: "photo"
        })
        .then(image => setPathImage(image.path))
        .catch(e => console.log('e' + e.message))
      }
return (
    <View style={{flex: 1}}>
        <TextInput placeholder="Input service name" value={listService && listService.serviceName} onChangeText={(text) => setListService({...service, serviceName: text})}/>
        <TextInput label="Input price" value={listService && listService.price} onChangeText={(text) => setListService({ ...service, price: text })}/>
        <Image source={{uri: pathImage}}
            resizeMode="contain"
            style={{height: 300, width: 400, alignItems: 'center'}}
        />    
        <Button onPress={uploadImage}>
           Upload Image   
        </Button>
        <Button onPress={handleUpdateServices}>
            Update
        </Button>
    </View>
)
}