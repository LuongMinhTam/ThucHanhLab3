import { useEffect, useState } from "react"
import { useMyContextController } from "../context";
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { Alert, Image, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker';



export default ServiceUpdate = ({navigation, route}) => {
    const [listService, setListService] = useState([]);
    const [pathImage, setPathImage] = useState('');
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    const {service} = route.params;
    console.log("update test: " + service.id)
    const SERVICES = firestore().collection("SERVICES");

  useEffect(() => {
    SERVICES.doc(service.id).onSnapshot(response => {
      setListService(response.data())
    });
    setPathImage(service.image);
  }, [])

    const formatPrice = (value) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR'
        }).format(value);

    const handleAddNewServices = async () => {
        if (!listService.serviceName || !listService.price || !pathImage) {
          console.log('Vui lòng nhập đầy đủ thông tin')
        }
        else {
          const timestamp = firestore.FieldValue.serverTimestamp();
          
            const ref = storage().ref("/services/"+ listService.id + ".png")
            ref.putFile(pathImage).then(() => {
              ref.getDownloadURL().then(link => 
                {
                  console.log(link)
                  SERVICES.doc(listService.id).update({...listService, image: link})
                  .then(() => {
                    console.log("Updated service")
                    navigation.navigate('Home')
                  })
                  .catch(error => console.log(error.message));
                }
              )
            })
        }
      }
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
        <TextInput placeholder="Input service name" value={listService && listService.serviceName} onChangeText={(text) => setListService(...service, serviceName)}/>
        <TextInput label="Input price" value={listService && listService.price} onChangeText={(text) => setListService({ ...service, price: text })}/>
        <Image source={{uri: pathImage}}
            resizeMode="contain"
            style={{height: 300, width: 400, alignItems: 'center'}}
        />    
        <Button onPress={uploadImage}>
           Upload Image   
        </Button>
        <Button onPress={handleAddNewServices}>
            Update
        </Button>
    </View>
)
}