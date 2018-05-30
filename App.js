import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  FlatList,
  Alert,
} from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Toolbar, Icon, ListItem, Button } from 'react-native-material-ui';
import Container from './components/Container';
import {seedHealthRecord, seedKey} from './js/seed.js'
const RNFS = require('react-native-fs');
const healthRecordPath = RNFS.DocumentDirectoryPath + '/healthrecord.medid';

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 100,
        },
    },
};

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    seedHealthRecord(false)
    seedKey(false)

    this.state = {
      active: 'Activity',
      healthRecord: [],
      isUpdating: false,
    };
  }

  componentWillMount() {
    RNFS.readFile(healthRecordPath, 'utf8')
    .then(data =>  JSON.parse(data))
    .then(healthRecord => {
      console.log("FETCHED: " + healthRecord);
      this.setState({healthRecord: healthRecord.medicalHistory})
    }).catch(err => {
      console.log(err.message);
    })
  }

  allowHealthRecordsUpdate = () => {
    this.setState({isUpdating: true})
    // ideally we scan qr code again, but for now..
    console.log("allowHealthRecordsUpdate()")
    showHealthRecordsEndpoint="https://med-id-server.herokuapp.com/healthrecord/cecilia_rosewood"
    fetch(showHealthRecordsEndpoint)
    .then(response => response.json())
    .then(data => {
      // write the file
      RNFS.writeFile(healthRecordPath, data.healthrecord, 'utf8')
      .then((success) => {
        this.setState({healthRecord: JSON.parse(data.healthrecord).medicalHistory, isUpdating: false})
      })
      .catch((err) => {
        this.setState({isUpdating: false})
      })
    })
    .catch(err => {
      this.setState({isUpdating: false})
    })
  }

  static navigationOptions = {
    title: 'Menu',
  };

  render() {
    let healthRecordData = this.state.healthRecord.map((item, index) => {
      return {visitType: item.visitType, referee: item.referee, key: "" + index}
    })

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
          <Toolbar
            leftElement="menu"
            centerElement={this.state.active}
            onLeftElementPress={() => this.props.navigation.openDrawer()}
          />
          <FlatList
            refreshing={this.state.isUpdating}
            onRefresh={() => this.allowHealthRecordsUpdate() }
            data={healthRecordData}
            renderItem={({item}) => <ListItem 
              style={{container: { height: 100} }}
              divider
              centerElement={{
                primaryText: item.visitType,
                tertiaryText: item.referee,
              }}
              rightElement={
                <Button disabled text="05/12/2018" />
              }
            />}
          />
        </Container>
      </ThemeProvider>
    );
  }
}