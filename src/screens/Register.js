import { useEffect, useState } from "react"
import { login, register, useMyContextController } from "../context";
import {  Text, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import auth from '@react-native-firebase/auth'
import  firestore  from "@react-native-firebase/firestore"

export default Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [controller, dispatch] = useMyContextController();
    const hasErrorName = () => name==""
    const hasErrorEmail = () => !email.includes('@') && email.length > 0
    const hasErrorPass = () => password.length < 6
    const hasErrorPassConfirm = () => confirmPassword != password || confirmPassword.length < 6

    const onRegister = () => {
        const USERS = firestore().collection("USERS");
        const customer = {
            name: name,
            phone: phone,
            address: address,
            email: email,
            password: password,
            role: 'customer'
          }
        USERS.doc(email).onSnapshot(u => {
            if(!u.exists)
            {
                auth().createUserWithEmailAndPassword(email, password)
                .then(() => 
                USERS.doc(email).set(customer)
                .then(() => {console.log("Add new user customer"); navigation.navigate("Login")})
                )
            }
        })
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 40, fontWeight: 'bold', alignSelf: 'center', color: "pink", marginBottom: 30}}>
                Register
            </Text>
            <TextInput placeholder="Full Name" value={name} onChangeText={setName}
                style={{margin: 10}}
                mode="outlined"
            />
            <HelperText type='error' visible={hasErrorName()}>
                Error name
            </HelperText>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{margin: 10}} mode="outlined" />
            <HelperText type='error' visible={hasErrorEmail()}>
                Error email
            </HelperText>
            <TextInput placeholder="Password" value={password} onChangeText={setPassword}
                style={{margin: 10}}
                right={<TextInput.Icon icon={"eye"} onPress={() => setShowPassword(!showPassword)}/>}
                mode="outlined"
            />
            <HelperText type='error' visible={hasErrorPass()}>
                Error password
            </HelperText>
            <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword}
                style={{margin: 10}}
                right={<TextInput.Icon icon={"eye"} onPress={() => setShowPassword(!showPassword)}/>}
                mode="outlined"
            />
            <HelperText type='error' visible={hasErrorPassConfirm()}>
                Error passwordconfirm
            </HelperText>
            <TextInput placeholder="Phone" value={phone} onChangeText={setPhone}
                style={{margin: 10}}
                mode="outlined"
            />
            <TextInput placeholder="Address" value={address} onChangeText={setAddress}
                style={{margin: 10}}
                mode="outlined"
            />
            <Button mode="contained-tonal" onPress={onRegister}
                style={{margin: 10, padding: 5}}
                labelStyle={{fontSize: 20}}
            >
                Đăng ký
            </Button>
        </View>
    )
}