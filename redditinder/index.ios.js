'use strict';

const React = require('react');
const ReactNative = require('react-native');
const Login = require('./src/Login.js');

const styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});

class redditinder extends React.Component {
  render(){
    return <Login style={styles.container}/>;
  }
}

ReactNative.AppRegistry.registerComponent('redditinder', () => redditinder);
