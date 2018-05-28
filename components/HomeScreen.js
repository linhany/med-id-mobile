import React, { Component } from 'react';
import {
    Button,
  } from 'react-native';

export default class HomeScreen extends React.Component {
    // TODO: some way to fetch the updated HR.. (ideally we scan QR code again, if not just hardcode the url and fetch when we press btn.)
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