import  firestore  from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";
import { MyContextControllerProvider } from "./src/context";
import {NavigationContainer} from '@react-navigation/native'
import { StyleSheet } from "react-native";
import Router from "./src/screens/Router";
import { PaperProvider } from "react-native-paper";

const initial = () => {
  const USERS = firestore().collection("USERS");
  const admin = {
    name: "admin",
    phone: '09111111',
    address: 'Binh Duong',
    email: 'afkkenta710@gmail.com',
    password: '123456',
    role: 'admin'
  }
  USERS.doc(admin.email).onSnapshot(u => {
    if(!u.exists)
      {
        auth().createUserWithEmailAndPassword(admin.email, admin.password)
        .then(() => 
          USERS.doc(admin.email).set(admin)
          .then(() => console.log("Add new user admin")) 
        )
      }
  })
}

const App = () => {
  useEffect(() => {
      initial();
  },[]);
  
  return (
    <MyContextControllerProvider>
      <PaperProvider>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </PaperProvider>
    </MyContextControllerProvider>
  )
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})