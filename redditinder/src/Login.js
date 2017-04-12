'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  NavigatorIOS
} from 'react-native';
import _ from 'lodash';
import Home from './Home.js';

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
      loggedIn: false,
      message: ''
    };
    this.username = '';
    this.password = '';
    this.images = [];
    this.redditName = 'aww';
  }

  typingUsername(event) {
    this.username = event.nativeEvent.text;
  }

  typingPassword(event) {
    this.password = event.nativeEvent.text;
  }

  _responseHandler(response) {
    for (var i = 0; i < response.data.children.length; i++) {
      if (response.data.children[i].data.preview.enabled && _.isEmpty(response.data.children[i].data.preview.images[0].variants)) {
        this.images.push({
          url: {uri: String(response.data.children[i].data.preview.images[0].source.url)},
          liked: undefined
        })
      }
    }
    console.log(this.images, this.images.length);
    this.setState({
      isLoading: false,
      loggedIn: true
    });
  }

  _requestLogin() {
    this.setState({ isLoading: true });
    console.log('Username & PW:' ,this.username, this.password);
    // POST Request to server here to check login, dummy check for password
    if (this.password === 'Password') {
      fetch('https://www.reddit.com/r/aww.json')
        .then(response => response.json())
        .then(json => this._responseHandler(json))
        .catch(error =>
           this.setState({
            isLoading: false,
            message: 'Error occured: ' + error
         }));
    } else {
      this.setState({
        isLoading: false,
        message: 'Wrong password or Username!'
      })
    }
  }

  checkLogin() {
    return this.state.loggedIn;
  }

  render(){
    var spinner = this.state.isLoading ? (<ActivityIndicator size='large' style={styles.image}/>) : (<View/>);
    if(!this.state.loggedIn) {
      return(
        <View style={styles.container}>
          <Image source={require('../reddit-logo.png')} style={styles.image}/>
          <View style={styles.flowRight}>
            <TextInput style={styles.textInput} placeholder='Username' defaultValue={this.username} onChange={this.typingUsername.bind(this)}/>
            <TextInput style={styles.textInput} placeholder='Password' defaultValue={this.password} onChange={this.typingPassword.bind(this)}/>
          </View>
          <View style={styles.flowRight}>
            <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this._requestLogin.bind(this)}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.description}>{this.state.message}</Text>
          {spinner}
        </View>
      );
    } else {
      return <NavigatorIOS style={{flex: 1}} initialRoute={{title: `${this.redditName} | ${this.username}`, component: Home, passProps:{
        username: this.username,
        redditName: this.redditName,
        images: this.images,
        checkLogin: this.checkLogin.bind(this)
      }}}/>
    }
  }
}

module.exports = Login;
