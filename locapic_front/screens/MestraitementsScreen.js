  import React from 'react';
import {View, ScrollView, StyleSheet } from 'react-native';
import {Avatar,Badge,Text,Divider,Icon,CheckBox, List, ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import Header from '../components/header';
import ButtonMenu from '../components/button-menu';
import TreatmentModal from '../components/menu-commandes';
import MenuTraitement from '../components/menu-valider';
import { APP_COLORS } from '../styles/color';


class Traitements extends React.Component {

//////////////////////////
constructor() {
super();

this.state = {
  result:[],
  modalIsVisible: false,
  isMenuTraitementVisible:false
};
}

componentDidMount() {
  var ctx = this;

    fetch('http://10.2.1.19:3000/traitements')
    .then((response) => {
      return response.json();
    })
    .then((data) =>{

//console.log(data);
     this.props.refreshTraitement(data)

    })
    .catch((error) => {
      console.log('Request failed', error)
    });
  }



// fonction afficher fenetre modal
showModal (item) {
  this.setState({
    modalIsVisible: true,
    id: item._id})
}

// fonction fermer fenetre modale
hideModal () {
  console.log("hide @@@@@@");
this.setState({
  modalIsVisible: false,
  id:null
})}

// fonction de suppression d'un traitement
deleteTreatment () {
  const {id} = this.state
  this.setState({
    modalIsVisible: false,
    id:null})
  // Fonction de suppression en bdd
  fetch(`http://10.2.1.19:3000/delete-traitement?id=${id}`)
  .then((response) => {
    return response.json();
  })
  .then((data) =>{

  console.log(data);
   this.props.refreshTraitement(data)

  })
  .catch((error) => {
    console.log('Request failed', error)
  });



}

/////////////////// fonction de changement du statut d'un traitement
changeStatus () {
  const {id} = this.state
  this.setState({
    modalIsVisible: false,
    id:null})


  // Fonction de maj du statut d'un traitement
  fetch(`http://10.2.1.19:3000/update-traitement?id=${id}`)
  .then((response) => {
    return response.json();
  })
  .then((data) =>{

//console.log(data);
   this.props.refreshTraitement(data)

  })
  .catch((error) => {
    console.log('Request failed', error)
  });

}

  render() {

  var resultList = this.props.result.map((item, i) =>{

    return(

            <ListItem
              key={item._id}
              title={item.traitement}
              badge={{
                element: (
                  <Badge
                    value={item.status}

                    containerStyle={
                      item.status == "Enregistré"
                        ? { backgroundColor: '#3498db'}
                        : item.status == "Validé"
                        ? { backgroundColor: '#9b59b6'}
                        : { backgroundColor: '#2ecc71' }
                    }

                    />
                )
              }}

              subtitle={
                <View style={styles.subtitle}>
                <Text style={styles.ratingText}>{item.activite}</Text>
                </View>
              }


               onPress={() =>{
                 this.props.trait(item._id)
                 this.props.navigation.navigate('FicheTraitement')
                  }
               }

               onLongPress={() =>{
                 this.showModal(item)
                  }
                }



               >
            </ListItem>


        )
})


    return (




  <View style={{ flex: 1 }}>
        <Header content="Mes Traitements" />
          <ScrollView>
            <List containerStyle={{marginTop:0}}>
                {resultList}
            </List>
          </ScrollView>


        <ButtonMenu
          actionQuitter={() => this.props.navigation.navigate('Home')}
          actionNouveau={() => this.props.navigation.navigate('Nouveau')}
          actionTraitements={() => this.props.navigation.navigate('Traitements')}
        />


        <TreatmentModal
          isVisible={this.state.modalIsVisible}
          hideModal={this.hideModal}
          deleteTreatment={()=>this.deleteTreatment()}
          changeStatus={()=>this.changeStatus()}
        />
  </View>
    );
  }
}

const styles = StyleSheet.create({

  subtitle:{
    flexDirection:'row',
    padding:10,
    paddingTop:5,
  },
  ratingText:{
    color: 'grey',
  }
});

function mapStateToProps(state) {

  return {
    result: state.updatetrait
   }
}


function mapDispatchToProps(dispatch) {
 return {
   trait: function(idtrait){
     dispatch({type: 'traitScan', trait:idtrait })
   },
   refreshTraitement: function(data){

      dispatch({type: 'refreshTraitements', traitements:data })
   }
 }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Traitements);
