/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import Amplify from '@aws-amplify/core';
import awsmobileDev from './aws-exports-dev';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

Amplify.configure(awsmobileDev);

AppRegistry.registerComponent(appName, () => App);
