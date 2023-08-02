import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React , {useEffect, useState}from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import List from './app/screens/List/List';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FireBaseConfig';
import Details from './app/screens/Details/Details';
import { Ionicons } from '@expo/vector-icons';
const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

const InsideLayout = () => {
  return (
    <InsideStack.Navigator>
    <InsideStack.Screen name="Home" component={List}></InsideStack.Screen>
    <InsideStack.Screen name="details" component={Details}></InsideStack.Screen>
  </InsideStack.Navigator>
  )
}

export default function App() {
  const [user,setUser] = useState();
  useEffect(() =>{
onAuthStateChanged(FIREBASE_AUTH,(user)=>{
  setUser(user);
})
  },[]);
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      {user ? (
        <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}></Stack.Screen>
      ):(
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}></Stack.Screen>
      )}
      
    </Stack.Navigator>
   </NavigationContainer>
  );
}

