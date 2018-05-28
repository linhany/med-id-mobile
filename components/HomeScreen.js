import React, { Component } from 'react';
import {
    Button,
  } from 'react-native';
import {seedHealthRecord, seedKey} from '../js/seed.js'

export default class HomeScreen extends React.Component {
    constructor() {
      super()
      seedHealthRecord()
      seedKey()
      // fetch from URL -> if success, replace HR on disk.
    }

    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <Button
          title="Scan QR Code"
          onPress={() =>
            navigate('Scan')
          }
        />
      );
    }
  }