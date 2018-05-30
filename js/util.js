import React, { Component } from 'react';
import {
  Alert,
} from 'react-native';
const RNFS = require('react-native-fs');
const healthRecordPath = RNFS.DocumentDirectoryPath + '/healthrecord.medid';

reset = () => {
  Alert.alert(
    'Warning',
    'This will reset healthrecords to initial state, and reset appointment made for doctor.',
    [
      {text: 'Cancel', onPress: () => {console.log("cancelled!")}},
      {text: 'OK', onPress: () => {

        const resetEndpoint = "https://med-id-server.herokuapp.com/doctor/1/appointment/hide"
        seedHealthRecord(true)
        fetch(resetEndpoint, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: "",
          }).then((response) =>  {
            console.log(response)
          }).catch((err) => {
            console.log(err.message);
          });

      }}
    ],
  )
}

module.exports = {
  reset: reset
}