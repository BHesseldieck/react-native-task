'use strict';

const React = require('react');
const ReactNative = require('react-native');
const Login = require('./src/Login.js');

const styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

class redditinder extends React.Component {
  render(){
    return <ReactNative.NavigatorIOS style={styles.container} initialRoute={{title: 'Login', component: Login}} />;
  }
}

ReactNative.AppRegistry.registerComponent('redditinder', () => redditinder);