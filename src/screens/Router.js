import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../context";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import RouterServices from "./RouterServices";
import Admin from "./Admin";
import Customer from "./Customer";
import RouterCustomer from "./RouterCustomer";


const Stack = createStackNavigator();
export default Router = () => {
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown : false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="Customer" component={Customer} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RouterServices" component={RouterServices} />
            <Stack.Screen name="RouterCustomer" component={RouterCustomer} />
        </Stack.Navigator>
    )
}