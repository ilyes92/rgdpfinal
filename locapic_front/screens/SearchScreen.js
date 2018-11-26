import React from 'react';
import {View, ScrollView, StyleSheet } from 'react-native';
import {Avatar,Button, Text,Divider,  List, ListItem,CheckBox  } from 'react-native-elements';
import Header from '../components/header';
import ButtonMenu from '../components/button-menu';

import {connect} from 'react-redux';
import { style } from '../style';


class LinksScreen extends React.Component {



  constructor(props) {
  super(props);

  var checkList = this.props.scanList.map((item, i) =>  false);
  var valueList = this.props.scanList.map((item, i) =>  item);
  this.state = {
    checkList,
    valueList
  };
  }

  envoyerClick=()=>{
     // http://10.2.1.19:3000/add-traitement
     console.log(this.state.checkList);
     console.log("id traitement ",this.props.idNewTrait);

    var valuesToSend = [];
    for(var i=0; i<this.state.checkList.length; i++){
      if(this.state.checkList[i] == true) {
        valuesToSend.push(this.state.valueList[i]);
      }
    }
    console.log(valuesToSend);
    fetch('http://10.2.1.19:3000/add-donneestraitement',{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: "donnes="+JSON.stringify(valuesToSend)+"&idtraitement="+this.props.idNewTrait
    }
  ).then((response) => {
     return response.json();
   }).then((user) => {
     this.props.navigation.navigate('FicheTraitementNew')
   }).catch(function(error) {
     console.log('Request failed', error)
   });
  }
  render() {

    var coincideList = this.props.scanList.map((item, i) =>{

        return(

          <ListItem
          key={i}
          title={item}
            subtitle={
              <View style={styles.subtitle}>
                  <CheckBox
                      checkedColor='green'
                      checked={
                        this.state.checkList[i]
                      }
                      onPress={()=>{
                        var copyCheckList = [...this.state.checkList];
                        copyCheckList[i] = !this.state.checkList[i];
                        this.setState({
                          checkList: copyCheckList
                        });
                      }}
                />
              </View>
            }
            >
          </ListItem>
        )
      })

    return (

      <ScrollView>

        <Header content="VALIDATION SCAN DONNEES" containerStyle={{justifyContent: 'center',alignItems: 'center'}} />



        <List>
          {coincideList}
        </List>


      <Divider style={{height:20}}/>

      <Button
        style={{width:100, marginTop:20}}
        title="VALIDER SCAN"
        backgroundColor="#3498db"
        onPress={() => this.envoyerClick()}
      />

  <Divider style={{height:20}}/>

     </ScrollView>
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
    scanList: state.scanList,
    idNewTrait: state.idNewTrait
   }
}

export default connect(
    mapStateToProps,
    null
)(LinksScreen);
