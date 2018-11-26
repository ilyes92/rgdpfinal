import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { style } from './style';

const MenuTraitement = ({
                        isVisible,
                        onDisapearCallBack,
                        onDeleteCallBack}) => (
  <TouchableWithoutFeedback onPress={() => onDisapearCallBack()}>
    <Modal
      isVisible={isVisible}
      animationIn={'zoomInDown'}
      animationOut={'zoomOutUp'}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransiitonInTiming={1000}
      backdropTransiitonOutTiming={1000}
    >
      <TouchableWithoutFeedback>

        <View style={style.modal}>

          <View style={style.textView}>

            <Text>Souhaitez vous ? </Text>
          </View>
          <View style={style.buttonView}>
            <Button
              buttonStyle={style.buttonDelete}
              title="Supprimer"
              onPress={() => onDisapearCallBack()}
            />
            <Button
              buttonStyle={style.buttonChangeStatus}
              title="Valider"
              onPress={() => onDisapearCallBack() }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  </TouchableWithoutFeedback>
);

export default MenuTraitement;
