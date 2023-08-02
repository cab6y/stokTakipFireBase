import { View, Text } from 'react-native'
import React from 'react'
import List from '../List/List';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const InsideStack = createNativeStackNavigator();

const Inside = () => {
  return (
    <InsideStack.Navigator>
    <InsideStack.Screen name="My Todos" component={List}></InsideStack.Screen>
  </InsideStack.Navigator>
  )
}

export default Inside