import React, { Component } from 'react';
import {
    View,
    Button,
    Alert
  } from 'react-native';
import {seedHealthRecord, seedKey} from '../js/seed.js'
const RNFS = require('react-native-fs');
const healthRecordPath = RNFS.DocumentDirectoryPath + '/healthrecord.medid';

export default class HomeScreen extends React.Component {
    constructor() {
      super()
      seedHealthRecord()
      seedKey()
    }

    allowHealthRecordsUpdate = () => {
      // ideally we scan qr code again, but for now..
      console.log("allowHealthRecordsUpdate()")
      showHealthRecordsEndpoint="https://med-id-server.herokuapp.com/healthrecord/cecilia_rosewood"
      fetch(showHealthRecordsEndpoint)
      .then(response => response.json())
      .then(data => {
        // write the file
        RNFS.writeFile(healthRecordPath, data.healthrecord, 'utf8')
        .then((success) => {
          console.log('Healthrecord updated in phone!');
          Alert.alert(
            'Success!',
            'Your healthrecords have been updated.'
          )
        })
        .catch((err) => {
          console.log("Failed to write health records to phone: " + err.message);
          Alert.alert(
            'Error!',
            'Something went wrong on our end. Please try again.'
          )
        })
      })
      .catch(err => {
        console.log("Failed to fetch health records: " + err.message)
        Alert.alert(
          'Error!',
          'Something went wrong on our end. Please try again.'
        )
      })
    }

    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <Button
            title="Grant access to health records"
            onPress={() =>
              navigate('Scan')
            }
          />
          <Button
            title="Allow update of health records"
            onPress={() =>
              this.allowHealthRecordsUpdate()
            }
          />
        </View>
      );
    }
  }