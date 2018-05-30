import { AppRegistry } from 'react-native';
import Root from './Root';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);
YellowBox.ignoreWarnings(['Module RNRandomBytes']);
YellowBox.ignoreWarnings(['Module RNOS']);


AppRegistry.registerComponent('MedIdMobile', () => Root);
