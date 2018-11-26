import React from 'react';
import {View,ImageBackground,Image,Button as Bouton, TouchableHighlight,TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar, Text, Button, Divider} from 'react-native-elements'

const styles = StyleSheet.create({
  stretch: {
    width: 200,
    height: 200
  }
});


export default class HomeScreen extends React.Component {




  render() {
    return (



      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>

      



              <TouchableOpacity
                  onPress={ ()=> this.props.navigation.navigate('SignIn')}>
                <Image
                  style={styles.stretch}
                  source={require('../assets/images/logo.png')}
                />

             </TouchableOpacity>



      </View>

      );
  }
}
