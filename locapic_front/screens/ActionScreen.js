import React from 'react';
import { View,Text as TextRN } from 'react-native';
import {Avatar, Button, Text} from 'react-native-elements';
import FontAwesome, { Icons } from "react-native-fontawesome";





export default class AccountScreen extends React.Component {
  render() {
    return (




      <View style={{flex:1,justifyContent: 'center',alignItems: 'center',  }}>

        <Button
        large
        icon={{name: 'plus', type: 'font-awesome'}}
        title='NOUVEAU TRAITEMENT'
        onPress={() => this.props.navigation.navigate('stepone')}
         />

    </View>
    );
  }
}
