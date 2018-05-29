import React, { Component } from 'react';
const RNFS = require('react-native-fs');
import {encryptStringWithPublicKey, encryptStringWithSymmetricKey} from '../js/crypto'

import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
const healthRecordPath = RNFS.DocumentDirectoryPath + '/healthrecord.medid';
const keyPath = RNFS.DocumentDirectoryPath + '/key.medid';

export default class ScanScreen extends Component {  
  onSuccess(e) {
    console.log("DATA IS: " + e.data)
    this.authorizeHR(e.data)
  }

  authorizeHR = (authorizeEndpoint) => {
    const { navigate } = this.props.navigation;

    RNFS.readFile(healthRecordPath, 'utf8')
    .then(healthRecord => {
        console.log("healthRecord read from disk: "+ healthRecord)
        RNFS.readFile(keyPath, 'utf8')
        .then(key => {
          console.log("key read from disk: "+ key)

            // encrypt HR with key
            healthRecord = encryptStringWithSymmetricKey(healthRecord, key)
            console.log("encrypted healthrecord: " + healthRecord);

            // ===========  TODO: See how to encrypt here and decrypt on server ============
            // encrypt key with doctor's public key (from the url)
            arr = authorizeEndpoint.split("/")
            const publicKey = arr[arr.length - 2]
            console.log("public key used: " + publicKey)
            Ekey = encryptStringWithPublicKey(key, publicKey)
            console.log("encrypted key: " + Ekey)
            // =============================================================================

            // send encryptedHR + encryptedKey to the url
            const payload = {
                "patient_id": "cecilia_rosewood",
                "healthrecord": healthRecord,
                "key": key
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
                }).catch((err) => {
                  console.log(err.message);
                  navigate('Home')
                  Alert.alert(
                      'Error',
                      'Something went wrong on our end. Please try again.'
                    )
                });
        })
      })
      .catch((err) => {
        console.log(err.message);
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