import { createContext, useContext, useMemo, useReducer } from "react";
import firestore from '@react-native-firebase/firestore'
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

const MyContext = createContext();
MyContext.displayName = "My2Context";

function reducer(state, action) {
    switch (action.type) {
        case "USER_LOGIN": {
            return { ...state, userLogin: action.value };
        }
        case "USER_LOGOUT": {
            return { ...state, userLogin: null };
        }
        default: {
            throw new Error(`Unhandle action type: ${action.type}`);
        }
    }
}

function MyContextControllerProvider({ children }) {
    const initialState = {
        userLogin: null,
    };
    const [controller, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}

function useMyContextController() {
    const context = useContext(MyContext);
    if(!context) {
        throw new Error(
            "useMyContextController should be used inside the MyContextControllerProvider"
        );
    }
    return context;
}

const USERS = firestore().collection("USERS")
const SERVICES = firestore().collection("SERVICES")

const register = (dispatch, email, password) => {
    auth().createUserWithEmailAndPassword(email, password)
    .then(
        () => 
            USERS.doc(email).onSnapshot( u => {
                const value = u.data();
                console.log("Đăng ký thành công với user: ", value);
                dispatch({type: "USER_LOGIN", value});
            })
    )
    .catch(e => Alert.alert("Lỗi đăng ký!"))
}

const login = (dispatch, email, password) => {
    auth().signInWithEmailAndPassword(email, password)
    .then(
        () => 
            USERS.doc(email).onSnapshot(u => {
                const value = u.data();
                console.log("Đăng nhập thành công với user: ", value);
                dispatch({type: "USER_LOGIN", value});
            })
    )
    .catch(e => Alert.alert("Sai user và password"))
}

const logout = (dispatch) => {
    dispatch({type:"USER_LOGIN", })
}

const createNewService = (newService) => {
    newService.finalUpdate = firestore.FieldValue.serverTimestamp()
    SERVICES.add(newService)
    .then(() => Alert.alert("Add new service !"))
    .catch((e) => Alert.alert(e))
}

export {
    MyContextControllerProvider,
    useMyContextController,
    register,
    login,
    logout,
    createNewService,
};

