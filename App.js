/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
//引入路由文件
import { router } from './src/route/index';
const AppContainer = createAppContainer(router);
export default class App extends React.Component{
  render(){
    return (
     <AppContainer></AppContainer>
    );
  }
  
};

const styles = StyleSheet.create({
  
});

