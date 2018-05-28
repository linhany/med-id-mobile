import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {  
  onSuccess(e) {
    console.log("DATA IS: " + e.data)
    this.authorizeHR(e.data)
}

  authorizeHR = (authorizeEndpoint) => {
    const { navigate } = this.props.navigation;
    // read HR from disk

    // generate key (or read from disk)

    // encrypt HR with key

    // encrypt key with doctor's public key (from the url)

    // send encryptedHR + encryptedKey to the url
    const payload = {
        "patient_id": "patientMobile",
        "healthrecord": "{patient-name: 'mobile', 'dob': '02-02-1990', 'blah': 'blah-blah'}",
        "key": "key-from-mobile"
    }

    fetch(authorizeEndpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        }).then((response) =>  {
            console.log(response)
            navigate('Home')
            Alert.alert(
                'Success!',
                'The doctor has been authorized to access your healthrecords.'
              )
        })
          .catch((error) => { 
            console.error(error)
            navigate('Home')
            Alert.alert(
                'Error',
                'Something went wrong on our end. Please try again.'
              )
        });
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Scan the QR code to <Text style={styles.textBold}>grant access</Text> to your health records.
          </Text>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('default', () => ScanScreen);