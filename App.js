import React, { Component } from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import HomeScreen from './components/HomeScreen'
import ScanScreen from './components/ScanScreen'

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Scan: { screen: ScanScreen },
});

export default App;