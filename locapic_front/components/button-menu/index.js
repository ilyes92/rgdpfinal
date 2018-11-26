import React from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { APP_COLORS } from '../../styles/color';

const ButtonMenu = ({actionQuitter, actionNouveau, actionTraitements}) => (


  <ActionButton  buttonColor={APP_COLORS.primaryAction}>
    <Icon color={APP_COLORS.primaryText}  />


  <ActionButton.Item buttonColor='#9b59b6' title="Quitter" onPress={actionQuitter}>
        <Icon name="md-power" style={styles.actionButtonIcon} />

      </ActionButton.Item>
      <ActionButton.Item buttonColor='#3498db' title="Nouveau" onPress={actionNouveau}>
        <Icon name="md-create" style={styles.actionButtonIcon} />

      </ActionButton.Item>
      <ActionButton.Item buttonColor='#1abc9c' title="Traitements" onPress={actionTraitements}>


        <Icon name="md-filing" style={styles.actionButtonIcon} />

      </ActionButton.Item>



  </ActionButton>
  );

  const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });

export default ButtonMenu;
