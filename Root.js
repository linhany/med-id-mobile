import React, { Component } from 'react';
import {
  StackNavigator,
  DrawerNavigator,
} from 'react-navigation';
import App from './App'
import DrawerMenu from './components/DrawerMenu';
import ScanScreen from './components/ScanScreen'

const stackNavigator = StackNavigator({
  Home: { screen: App },
  Scan: { screen: ScanScreen },
}, {
  headerMode: 'none'
});
const Root = DrawerNavigator({
  Home: {
    screen: App,
  },
  Stack: {
    screen: stackNavigator
  }
  }, {
    contentComponent: DrawerMenu,
    contentOptions: {
    activeTintColor: "#e91e63",
    style: {
      flex: 1,
      paddingTop: 15,
    }
  }
});


export default Root;