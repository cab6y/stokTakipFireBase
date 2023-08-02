import { View, Text , Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../../FireBaseConfig'
import { NavigationProp , useFocusEffect , onPress } from '@react-navigation/native'
import Details from '../Details/Details'

const List = ({navigation}) => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Button onPress={() => navigation.navigate('details')} title='Details'/>
      <Text></Text>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title='LogOut'/>
    </View>
  )
}

export default List

