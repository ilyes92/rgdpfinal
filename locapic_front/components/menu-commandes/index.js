import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { style } from './style';

const MenuCommande = ({isVisible,hideModal,deleteTreatment,changeStatus}) => {
  console.log("isvisble",isVisible);
  console.log("hideModal",hideModal);
  return (

    <Modal
      isVisible={isVisible}
      animationIn={'zoomInDown'}
      animationOut={'zoomOutUp'}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransiitonInTiming={1000}
      backdropTransiitonOutTiming={1000}
      onBackdropPress={()=>{
        console.log("parent click on background");
        //hideModal()
      }}
    >

        <View style={style.modal}>
          <View style={style.textView}>
            <Text>Que souhaitez vous faire</Text>
          <Text>pour ce traitement ?</Text>
          </View>
          <View style={style.buttonView}>
            <Button
              buttonStyle={style.buttonDelete}
              title="Supprimer"
              onPress={deleteTreatment}
            />
            <Button
              buttonStyle={style.buttonChangeStatus}
              title="Modifier statut"
              onPress={changeStatus}
            />
          </View>
        </View>

    </Modal>


)};

export default MenuCommande;
