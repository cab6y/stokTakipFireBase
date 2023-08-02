import { View, 
  Text ,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView, 
  TextInput} from 'react-native'
import React , {useEffect, useState}from 'react'
import { Button, Icon } from 'react-native-elements'
import {Firestore, setDoc, getDoc , doc , collection, addDoc , onSnapshot} from "firebase/firestore"
import { FIREBASE_DB , FIREBASE_APP , FIREBASE_AUTH , useProductsListener  } from '../../../FireBaseConfig';
const db = FIREBASE_DB;
const auth = FIREBASE_AUTH;

const productsRef = collection(FIREBASE_DB, "Urunler");



     
const Details = () => {
  const [selectedId, setSelectedId] = useState();
  //#region rendetItem
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      backgroundColor: item.backgroundColor,
      marginTop: 2,
      marginLeft:5,
      marginRight:5
    }}>
      <Image source={{ uri: "data:image/png;base64,"+ item.image }} style={{ width: 100, height: 125 , marginTop:0 }} />
     <TouchableOpacity style={[styles.item, item.backgroundColor]} >
     <Text style={[styles.title, {color: textColor}]}></Text>
      <Text style={[styles.title, {color: textColor}]}>Ürün Adı : {item.ad}</Text>
      <Text style={[styles.title, {color: textColor}]}>Satildi Mi : {item.satildi}</Text>
      <Text style={[styles.title, {color: textColor}]}>Cinsiyet : {item.cinsiyet}</Text>
      <Text style={[styles.title, {color: textColor}]}>Beden : {item.beden}</Text>
    </TouchableOpacity>
    <View style={{
      justifyContent: 'center',
      marginLeft:20,
    }}>
      <Icon  name='edit' />
    </View>
    <View style={{
      justifyContent: 'center',
      marginLeft:20,
    }}>
    <Icon  name='delete' />
    </View>
    </View>
  
  );
  
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#69cce4' : '#fff';
    const color = item.id === selectedId ? 'white' : 'black';
    
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  //#endregion
  //#region getProducts
  const [todos,setTodos] = useState([]);
  const [filter,setFilter] = useState();
  function getFilter(){
   console.log(filter);
    const todoRef = collection(db,'Urunler');
    const subscriber = onSnapshot(todoRef,{
      next:(snapshot) => {
        const products = [];
        snapshot.docs.forEach((doc) => {
          products.push(doc.data());
        });
       if(filter != ""){
        setTodos(products.filter(function(item){
          return item.ad.toString().toLowerCase().includes(filter.toLowerCase());
       }).map(function({ad,backgroundColor,image,satildi,beden,cinsiyet,id}){
           return {ad,backgroundColor,image,satildi,beden,cinsiyet,id};
       }));
       }
       if(filter == ""){
        setTodos(products);
       }
      }
    })
  }

  useEffect(()  =>{
    //addDoc(collection(db,'todos'),{title:'test',done:false});
    const todoRef = collection(db,'Urunler');
    const subscriber = onSnapshot(todoRef,{
      next:(snapshot) => {
        const products = [];
        snapshot.docs.forEach((doc) => {
          products.push(doc.data());
        });
        setTodos(products);
      }
    })

    // const todoRef = collection(FIREBASE_DB,'Urunler');
    // console.log(firebase.firestore().collection('Urunler'));
      },[]);

      //#endregion


     

  return (
    
    <View style={styles.container}>
      
      <TextInput onChangeText={text => setFilter(text)} placeholder='Search' style={{backgroundColor:'#fff',height:50}}></TextInput>
      <Button onPress={() =>getFilter()} title={'search'}></Button>
      <Text></Text>

        <SafeAreaView style={styles.container}>
        
     <FlatList
       data={todos}
       renderItem={renderItem}
       keyExtractor={item => item.id}
       extraData={selectedId}
     />
   </SafeAreaView>
   {/* <Button onPress={() => RedirectEdit(selectedId)}
 title="Edit"
 color="#841584"
/> */}

       </View>
  )
}

const config = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Dimensions.get('window').height
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  item: {
    padding: 5,
    fontSize: 18,
    height: 125,
  },
  title:{
    width:170,
  }
});
const deleteStyle = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginLeft:-150,
  }
});


const stylesScroolView = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
export default Details;