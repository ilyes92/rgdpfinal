import React from 'react';
import { View,ScrollView } from 'react-native';
import {Button,Text,Divider, FormLabel, FormInput} from 'react-native-elements';
import Header from '../components/header';
import ButtonMenu from '../components/button-menu';
import {connect} from 'react-redux';
import { style } from '../style';

class SignUpScreen extends React.Component {

  constructor(){
      super();
      this.handleClick = this.handleClick.bind(this)
      this.state = {activite : '',
                    traitement : '',
                    objectif : '',
                  }
    }

     handleClick=()=>{
        // Envoi du nouveau traotement en bdd via la route du backend
       fetch('http://10.2.1.19:3000/add-traitement',{
         method:"POST",
         headers: {'Content-Type':'application/x-www-form-urlencoded'},
         body:"activite="+this.state.activite+"&traitement="+this.state.traitement+"&objectif="+this.state.objectif
       }
     ).then((response) => {
        return response.json();
      }).then((user) => {
        //// récupération de l'id traitement généré par mongoose et stockage dans le reducer  idNewTrait
        ///console.log("id new trait",user._id);
        this.props.idNewTrait(user._id);
        // on va vers la vue App.js via la navigation Scanner
        this.props.navigation.navigate('Scanner');
      }).catch(e=>{console.log("error",e)})
     }

 render() {

   return (

  <View style={{ flex: 1 }}>
    <Header content="Nouveau Traitement" />
    <ScrollView>



     <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>

         <FormLabel>Activité</FormLabel>
         <FormInput onChangeText={(text)=>this.setState({activite:text})}/>
         <FormLabel>Nom traitement</FormLabel>
         <FormInput onChangeText={(text)=>this.setState({traitement:text})}/>
         <FormLabel>Objectif</FormLabel>
         <FormInput onChangeText={(text)=>this.setState({objectif:text})}/>


       <Divider style={{height:20}}/>


         <Button
                style={{width:100, marginTop:20}}
                title="Enregistrer"
                backgroundColor="#3498db"
                 onPress={this.handleClick}
              />


    </View>



  </ScrollView>

                <ButtonMenu
                  actionQuitter={() => this.props.navigation.navigate('Home')}
                  actionNouveau={() => this.props.navigation.navigate('Nouveau')}
                  actionTraitements={() => this.props.navigation.navigate('Traitements')}
                />

</View>
   )
 }
}


function mapDispatchToProps(dispatch) {
 return {
   idNewTrait: function(idNewTrait){
     dispatch({type: 'idNewTrait', idNewTrait:idNewTrait })
   }
 }
}

export default connect(
   null,
   mapDispatchToProps
)(SignUpScreen);
