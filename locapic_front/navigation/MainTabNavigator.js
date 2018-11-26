import React from 'react';
import { Platform } from 'react-native';
//import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';


import TabBarIcon from '../components/TabBarIcon';
import Actions from '../screens/ActionScreen';
import Camera from '../screens/App';
import Picture from '../screens/Picture';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SearchScreen from '../screens/SearchScreen';
import NewoneScreen from '../screens/NewoneScreen';
import Mestraitements from '../screens/MestraitementsScreen';
import FicheTraitementNew from '../screens/FichetraitementnewScreen';
import FicheTraitement from '../screens/FichetraitementScreen';

// suppression de la barre latérale de navigation

// var Nav = createBottomTabNavigator({
//   Quitter:HomeScreen,
//   Traitements: Mestraitements,
//   Scan:SearchScreen,
//   Nouveau:NewoneScreen,
// });


export default createStackNavigator({
  Home:HomeScreen,
  SignIn:SignInScreen,
  Nouveau:NewoneScreen,
  Traitements: Mestraitements,
  Scanner:Camera,
  FicheTraitementNew:FicheTraitementNew,
  FicheTraitement:FicheTraitement,
  Scan:SearchScreen
},
{
  headerMode:'none'
}

)
