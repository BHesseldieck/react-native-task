'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  NavigatorIOS
} from 'react-native';
import Login from './Login.js';


const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    alignItems: 'center',
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
  image: {
    width: 150,
    height: 150,
    marginTop: 30,
    borderRadius: 30,
    borderColor: '#48BBEC',
    borderWidth: 3,
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    if (this.props.checkLogin()){
      return (
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={200}>
          {this.props.images.map((ele,index) => (<Image source={ele.url} style={styles.image} key={index.toString()}/>))}
          </ScrollView>
        </View>
      )
    } else {
      return <Login style={{flex: 1}}/>;
    }
  }
}

module.exports = Home;
