import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { logout, useMyContextController } from '../context';
import { Button } from 'react-native-paper';

function Setting({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  useEffect(() => {
    if (userLogin == null)
        navigation.navigate("Login")
  }, [userLogin])

  const onLogout = () => {
    navigation.navigate("Login")
    logout(dispatch);
    
    console.log(userLogin)
  }
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {userLogin && (<Text style={{fontWeight: 'bold', fontSize: 30, margin: 10}}>
        {userLogin.name}
      </Text>)}
      
      <Button mode="contained-tonal" onPress={onLogout}
          style={{margin: 10, padding: 5}}
          labelStyle={{fontSize: 20}}
      >
          Logout
      </Button>
    </View>
  )
}

export default Setting