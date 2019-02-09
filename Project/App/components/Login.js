import React from 'react';
import { StyleSheet, 
          Text, 
          View,
          TextInput,
          KeyboardAvoidingView,
          TouchableOpacity,
          //Alert,
          AsyncStorage } from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation';
import { Constants, SQLite } from 'expo';
import { openDatabase } from 'react-native-sqlite-storage';

import ApiKeys from '../constants/ApiKeys.js';
import * as firebase from 'firebase';

const db = SQLite.openDatabase('db.db');

export default class Login extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
        isAuthenticationReady: true,
        isAUthenticated: false,
      }

    //initialize firebase
    /*if (!firebase.apps.length){
      firebase.initializeApp(ApiKeys.FireBaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);*/
    
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyB-o8maO0AwEBmrchncqK1VNJwgBGO6dLY",
      authDomain: "pokedexlike-fe4c3.firebaseapp.com",
      databaseURL: "https://pokedexlike-fe4c3.firebaseio.com",
      projectId: "pokedexlike-fe4c3",
      storageBucket: "pokedexlike-fe4c3.appspot.com",
      messagingSenderId: "609127205985"
    });
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAUthenticated: !!user});
  }

  componentDidMount(){
    //this._loadInitialState().done();
  }

  _loadInitialState = async () =>{
      //var value = await AsyncStorage.getItem('user');
      if (this.state.isAUthenticated){
          this.props.navigation.navigate('Profile');
      }
  }

  render() {
    return (
        <KeyboardAvoidingView behaviour='padding' style={styles.wrapper}>

          <View style={styles.container}>

            <Text style={styles.header}>- LOGIN -</Text>

            <TextInput
                style={styles.TextInput} placeholder='Username'
                onChangeText={ (username) => this.setState({username}) }
                underlineColorAndroid='transparent'
            />

            <TextInput
                style={styles.TextInput} placeholder='Password'
                onChangeText={ (password) => this.setState({password}) }
                underlineColorAndroid='transparent'
            />

            <TouchableOpacity
                style={styles.btn}
                onPress={this.login}>
                <Text>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btn_register}
                onPress={this.go_to_register}>
                <Text>Register</Text>
            </TouchableOpacity>

          </View>

        </KeyboardAvoidingView>
    );
  }

  login = () => {
      console.log('LOGIN');
      var username = this.state.username;
      var password = this.state.password;

      if (username === '' || password === ''){
        alert('Please provide login and password');
      }
      else{
        firebase.auth().signInWithEmailAndPassword(username, password)
        .then(() => {

        }, (error) => {
          alert(error.message);
        });
        //alert('we should navigate');
        //AsyncStorage.setItem('user', username);
        //this.props.navigation.navigate('Profile'); 
      }

  }

  go_to_register = () => {
    //this.props.navigation.navigate('Register');
    var navActions = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: "Signup"})
      ]
    });
    this.props.navigation.dispatch(navActions);
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  TextInput:{
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  btn:{
    marginBottom: 20,
    alignSelf: 'stretch',
    backgroundColor: '#01c853',
    padding: 20,
    alignItems: 'center',
  },
  btn_register:{
    marginBottom: 20,
    alignSelf: 'stretch',
    backgroundColor: '#afafaf',
    padding: 20,
    alignItems: 'center', 
  }
});