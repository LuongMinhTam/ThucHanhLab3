import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../context";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import RouterServices from "./RouterServices";


const Stack = createStackNavigator();
export default Router = () => {
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown : false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RouterServices" component={RouterServices} />
        </Stack.Navigator>
    )
}