import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBar,
    View
} from 'react-native';
import { COLOR, ThemeProvider, Toolbar, Drawer, Avatar } from 'react-native-material-ui';
import Container from './Container';
import { DrawerActions } from 'react-navigation';
import {reset} from '../js/util'


const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
        accentColor: COLOR.pink500,
      },
    toolbar: {
        container: {
            height: 70,
            paddingTop: 0,
          },
      },
  };

export default class DrawerMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        active: 'Home',
      };
  }

  render() {
    return (
        <ThemeProvider uiTheme={uiTheme}>
                <Container>
                    <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                    <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.dispatch(DrawerActions.closeDrawer())}
                    centerElement=""
                />
                    <View style={styles.container}>
                        <Drawer>
                            <Drawer.Header >
                                <Drawer.Header.Account
                                avatar={<Avatar text={'CR'} />}
                                footer={{
                                    centerElement: {
                                        primaryText: 'Cecilia Rosewood'
                                      }
                                  }}
                            />
                            </Drawer.Header>
                            <Drawer.Section
                            divider
                            items={[
                                {
                                    icon: 'check-circle', value: 'Check-in',
                                    active: this.state.active == 'Scan',
                                    onPress: () => {
                                        this.props.navigation.dispatch(DrawerActions.closeDrawer());
                                        this.props.navigation.navigate('Scan');
                                      },
                                  },
                                {
                                    icon: 'description', value: 'Activity',
                                    active: this.state.active == 'Home',
                                    onPress: () => {
                                        this.setState({ active: 'Home' });
                                        this.props.navigation.dispatch(DrawerActions.closeDrawer());
                                        this.props.navigation.navigate('Home');
                                      },
                                  },
                            ]}
                        />
                            <Drawer.Section
                            title="Personal"
                            items={[
                                {
                                    icon: 'info', value: 'Info',
                                    active: this.state.active == 'info',
                                    onPress: () => {
                                        // this.setState({ active: 'info' });

                                        // this.props.navigation.navigate('Info');
                                      },
                                  },
                                {
                                    icon: 'settings', value: 'Settings',
                                    active: this.state.active == 'settings',
                                    onPress: () => {
                                        // this.setState({ active: 'settings' });
                                        // this.props.navigation.navigate('Settings');
                                        reset()
                                      },
                                  },
                            ]}
                        />
                        </Drawer>
                    </View>
                </Container>
            </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
    header: {
        backgroundColor: '#455A64',
      },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
  });