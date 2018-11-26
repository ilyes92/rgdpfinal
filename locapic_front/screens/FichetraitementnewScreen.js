import React from 'react';
import {View, ScrollView, StyleSheet } from 'react-native';
import {Button,Text,Divider, FormLabel, FormInput} from 'react-native-elements';
import Header from '../components/header';
import ButtonMenu from '../components/button-menu';

import { style } from '../style';
import {connect} from 'react-redux';


class SignUpScreen extends React.Component {
  //////////////////////////
  constructor() {
  super();

  this.state = {
    result:{}
  };
  }

  componentDidMount(){
    var ctx = this;



      fetch('http://10.2.1.19:3000/traitement?id='+this.props.idNewTrait)
        .then(function(response) {
          console.log('resssponssssssss',response);
        return response.json();
      })
      .then(function(traitement) {
      console.log(traitement);

        var resultcopy=[...ctx.state.result];
       resultcopy.push(traitement);
        var res=resultcopy[0];
        ctx.setState({result:res});
       ctx.props.updateTraitement(traitement)
      })
      .catch(function(error) {
        console.log('Request failed', error)
      });



    }


 render() {



if(this.state.result[0]) {

  console.log("result",this.state.result[0]);
  console.log("donnees validées",this.state.result[0].donnees[0].donnee);

var traitement=this.state.result[0].traitement;
var activite=this.state.result[0].activite;
var objectif=this.state.result[0].objectif;

var tableauDonnees = this.state.result[0].donnees[0].donnee.map((item, i) =>{
    return(

    <FormInput
    key={i}
    value={item} editable={false}/>
    )
});
}

   return (
     <ScrollView>

             <Header content="Fiche Traitement" containerStyle={{justifyContent: 'center',alignItems: 'center'}} />

    <View style={{flex:1, alignItems:"center"}}>







         <FormLabel>Nom traitement</FormLabel>
         <FormInput  value={traitement} editable={false}/>

           <FormLabel>Activité</FormLabel>
           <FormInput  value={activite} editable={false}/>

             <FormLabel>Objectif</FormLabel>
             <FormInput  value={objectif} editable={false}/>

           <Divider style={{height:40}}/>

         <Text h4 style={{color: "#2980b9",alignItems:"center"}}>DONNEES</Text>

          {tableauDonnees}




     </View>

     <ButtonMenu
       actionQuitter={() => this.props.navigation.navigate('Home')}
       actionNouveau={() => this.props.navigation.navigate('Nouveau')}
       actionTraitements={() => this.props.navigation.navigate('Traitements')}
     />

     </ScrollView>
   )
 }
}

function mapStateToProps(state) {
  return {idNewTrait: state.idNewTrait,
   }
}

function mapDispatchToProps(dispatch) {
 return {
   updateTraitement: function(data){
      console.log("updateTraitement", data);
      dispatch({type: 'updatetraitements', traitements:data })
   }
 }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpScreen);
