import { View, Text, TextInput, ActivityIndicator } from 'react-native'
import React , {useState}from 'react'
import {FIREBASE_AUTH} from '../../FireBaseConfig'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native'
import {signInWithEmailAndPassword , createUserWithEmailAndPassword} from 'firebase/auth'
import Inside from './Inside/Inside'
function Login({ navigation }) {
    const [email, onChangeEmail] = useState('');
    const [password , onChangePassword] = useState('');
    const [loading , setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
   

    const signIn = async () => {
        setLoading(true);
        try{
            //console.log(email,password);
            const response = await signInWithEmailAndPassword(auth,email,password);
            //navigation.navigate("Inside",{itemId: data});
            //setLoading(false);
        }
        catch(error){
            alert('Error :' + error)
        }
        finally{
            setLoading(false);
        }
    }
    const signUP = async () => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth,email,password);
            alert('CHECK YOUR EMAIL');
        }
        catch(error){
            //console.log(error);
            alert('Error :' + error.message)
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <View style={styles.container}>
       <TextInput placeholder='Email' maxLength={40} onChangeText={text => onChangeEmail(text)} value={email} style={styles.input}/>
       <TextInput placeholder='Password' maxLength={40} secureTextEntry={true} onChangeText={text => onChangePassword(text)} value={password} style={styles.input}/>
    {loading ? <ActivityIndicator size='large' color="#fff"></ActivityIndicator>
    : <>
    <Button title="Login" onPress={signIn}></Button>
    <Text></Text>
    <Button  title="Create Account" onPress={signUP}></Button>
    </>
    }
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input:{
        marginVertical: 4,
        height:50,
        borderWidth:1,
        borderRadius:4,
        padding:10,
        backgroundColor: '#fff',
    }
})