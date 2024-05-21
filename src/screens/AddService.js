import { useState } from "react"
import { useMyContextController } from "../context";
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { Alert, Image, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker';



export default AddService = ({navigation}) => {
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState(0);
    const [pathImage, setPathImage] = useState('');
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    const SERVICES = firestore().collection("SERVICES");
    const formatPrice = (value) =>
        new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR'
        }).format(value);
    const handleAddNewServices = async () => {
        if (!serviceName || !price || !pathImage) {
          console.log('Vui lòng nhập đầy đủ thông tin')
        }
        else {
          const timestamp = firestore.FieldValue.serverTimestamp();
          const formattedPrice = formatPrice(price);
          const data = {
            serviceName: serviceName,
            price: formattedPrice,
            creator: userLogin.name,
            image: '',
            time: timestamp,
            finalUpdate: timestamp,
          }
          SERVICES.add(data)
          .then(response => {
            const ref = storage().ref("/services/"+ response.id + ".png")
            ref.putFile(pathImage).then(() => {
              ref.getDownloadURL().then(link => 
                {
                console.log(link)
                SERVICES.doc(response.id).update({id: response.id, image: link})
                }
              )
            })
            Alert.alert("Add new service success")    
            navigation.navigate('Home')
          })
          .catch(e => Alert.alert("Add new service fail"))
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
        <TextInput placeholder="Input service name" value={serviceName} onChangeText={setServiceName}/>
        <TextInput placeholder="Input price" value={price} onChangeText={setPrice}/>
        {(pathImage!='') && 
            <Image source={{uri: pathImage}}
                resizeMode="contain"
                style={{height: 300, width: 400, alignItems: 'center'}}
            />    
        }
        <Button onPress={uploadImage}>
           Upload Image   
        </Button>
        <Button onPress={handleAddNewServices}>
            Add new service
        </Button>
    </View>
)
}