import { useEffect, useState } from "react"
import { login, register, useMyContextController } from "../context";
import {  Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default Login = ({navigation}) => {
    const [email, setEmail] = useState("afkkenta710@gmail.com");
    const [password, setPassword] = useState("123456");
    const [showPassword, setShowPassword] = useState(false);
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;

    useEffect(() => {
        if(userLogin != null) {
            if(userLogin.role == 'admin') {
                navigation.navigate("Admin", {screen: "Home"})
            } else {
                navigation.navigate("Customer")
            }
        }
    }, [userLogin])

    const onSubmit = () => {
        login(dispatch, email, password);
    }
    const onRegister = () => {
        navigation.navigate("Register")
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 40, fontWeight: 'bold', alignSelf: 'center', color: "pink", marginBottom: 30}}>
                login
            </Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{margin: 10}} mode="outlined" />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword}
                style={{margin: 10}}
                right={<TextInput.Icon icon={"eye"} onPress={() => setShowPassword(!showPassword)}/>}
                mode="outlined"
            />
            <Button mode="contained-tonal" onPress={onSubmit}
                style={{margin: 10, padding: 5}}
                labelStyle={{fontSize: 20}}
            >
                Đăng nhập
            </Button>
            <Button mode="contained-tonal" onPress={onRegister}
                style={{margin: 10, padding: 5}}
                labelStyle={{fontSize: 20}}
            >
                Đăng ký
            </Button>
        </View>
    )
}