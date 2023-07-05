import { View, Text,StyleSheet,Image,Modal,Button,FlatList,Dimensions, Alert } from 'react-native'
import React,{useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import FileSystem from 'expo-file-system';



    // //download
    // function download(path) {
    //   const downloadResumable = FileSystem.createDownloadResumable(
    //     path,
    //     FileSystem.documentDirectory + path,
    //     {},
    //     ()=>Alert.alert('downloaded to', ddd.uri)
    //   );      
    //  }
export default function Splash() {
  const [loading,setloadig]= useState(true)//ploading page
  const [errorApi, setErrorApi] = useState(['none','flex']);
  const [all,setall]= useState([])
    //images
    const ico= require('../imgs/ico.png')

    

    function api() {
      setErrorApi(['none','flex'])
      fetch('https://view-wid.herokuapp.com/api/',{method:'GET',headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },}).then(res=>res.json()).then(json=>{
    setall(json.img)

    console.log(json);
   }).catch(err=>{
    if (err) {
      setErrorApi(['flex','none'])

      console.log(err);
    } 
   })
    }
  useEffect(() => {
   fetch('https://view-wid.herokuapp.com/api').then(res=>res.json()).then(json=>{
    console.log(json.img);
    setloadig(false)
    setall((json.img).sort(()=>{return Math.random()-0.5}))

   }).catch(err=>{
    if (err) {
      setErrorApi(['flex','none'])

      console.log(err);
    } 
   })
  },[])
  return (
    <SafeAreaProvider style={{flex:1 , backgroundColor:'#0d1117'}} >
      <View style={{flex:1,backgroundColor:'#0d1117',marginTop:45}}>
        <FlatList data={all} horizontal={true} pagingEnabled={true}
  showsHorizontalScrollIndicator={false}
  legacyImplementation={false} renderItem={
          ({item})=>< >
              <View style={{flex:1,alignItems:'center',width:Dimensions.get('window').width}}>
              <Image source={{uri:item.img}} resizeMode='contain' style={{width:'100%', height:'90%'}} />
                <Text style={{color:'white', fontWeight:'bold',fontSize: 17,}}>{item.Name}</Text>
                {/* <Button title='Save' color={'#ffff'} onPress={download(item.img)} /> */}
              </View>
                
              </>
            
          
        } keyExtractor={({item}, index) => index.toString()} />
      </View>
      <Modal visible={loading} animationType='slide' >
        <View style={styles.body}>
        <Image source={ico} resizeMode='contain' style={{width:200}} />
        <View style={{display:errorApi[1], justifyContent:'center', alignItems:'center', width:'100%'}}>
          
          <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>View Wid</Text>
          <Image source={require('../imgs/load.gif')} resizeMode='contain' style={{height:50}} />
          
          
        </View>
        <View style={{display:errorApi[0],justifyContent:'center', alignItems:'center', width:'100%'}}>
            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Network issues</Text>
            <Button title='reload' onPress={api} />
          </View>
        </View>
      
      </Modal>
      
      
        <StatusBar style='light' />
    </SafeAreaProvider>
  )
}


const styles = StyleSheet.create({
    body:{
        backgroundColor:'#0d1117',
        display:'flex',
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});