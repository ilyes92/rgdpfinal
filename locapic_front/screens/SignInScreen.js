import React from 'react';
import { View, Image,StyleSheet} from 'react-native';
import {Button,Avatar,Divider, FormLabel,FormInput} from 'react-native-elements';
import { style } from '../style';

const styles = StyleSheet.create({
  stretch: {
    width: 200,
    height: 200
  }
});

export default class SignInScreen extends React.Component {
 render() {
   return (
     <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>

       <Image
         style={styles.stretch}
         source={require('../assets/images/logo.png')}
       />

       <Divider style={{height:40}}/>

       <FormLabel>Votre identifiant</FormLabel>
        <FormInput/>

        <FormLabel>Votre mot de passe</FormLabel>
         <FormInput/>

 <Divider style={{height:40}}/>

         <Button
           style={{width:100, marginTop:20}}
           title ="Se connecter"
           backgroundColor="#3498db"
           onPress={() => this.props.navigation.navigate('Traitements')}
         />

     </View>
   )
 }
}
