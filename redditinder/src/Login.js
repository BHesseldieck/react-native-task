'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }, 
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    marginTop: 30,
    marginBottom: 70,
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loggedIn: false
    };
    this.username = '';
    this.password = '';
  }

  changeUsername(event) {
    this.username = event.nativeEvent.text;
  }

  changePassword(event) {
    this.password = event.nativeEvent.text;
  }

  _checkLogin(query) {
    this.setState({ isLoading: true });
    console.log(query);
    // POST Request to server here to check login, dummy check for password
    if (query[1] === 'Password') {
      this.setState({ loggedIn: true});
    }
  }

  onLoginPressed() {
    var query = [this.username,this.password];
    console.log(query);
    this._checkLogin(query);
  }

  render(){
    var spinner = this.state.isLoading ? (<ActivityIndicator size='large' style={styles.image}/>) : (<View/>);
    return(
      <View style={styles.container}>
        <Image source={require('../reddit-logo.png')} style={styles.image}/>
        <View style={styles.flowRight}>
          <TextInput style={styles.textInput} placeholder='Username' defaultValue={this.username} onChange={this.changeUsername.bind(this)}/>
          <TextInput style={styles.textInput} placeholder='Password' defaultValue={this.password} onChange={this.changePassword.bind(this)}/>
        </View>
        <View style={styles.flowRight}>
          <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.onLoginPressed.bind(this)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
        {spinner}
      </View>
    );
  }
}

module.exports = Login;