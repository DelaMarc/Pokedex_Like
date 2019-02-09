import React from 'react';
import { StyleSheet, 
          Text, 
          View,
          TextInput,
          KeyboardAvoidingView,
          TouchableOpacity,
          AsyncStorage } from 'react-native';

import Login from './Login';

import { StackNavigator, NavigationActions } from 'react-navigation';
import { Constants, SQLite } from 'expo';
import { openDatabase } from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('db.db');

export default class Register extends React.Component {

  Register: {screen: Register}

  constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
        res:false,
      }
  }

  componentDidMount(){

    //this._loadInitialState().done();
  }

  _loadInitialState = async () =>{
      var value = await AsyncStorage.getItem('user');
      if (value !== null){
          this.props.navigation.navigate('Profile');
      }
  }

  render() {
    return (
        <KeyboardAvoidingView behaviour='padding' style={styles.wrapper}>

          <View style={styles.container}>

            <Text style={styles.header}>- REGISTER -</Text>

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
                onPress={this.register}>
                <Text>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btn}
                onPress={this.go_back}>
                <Text>Back</Text>
            </TouchableOpacity>

          </View>

        </KeyboardAvoidingView>
    );
  }

  go_back = () => {
    var navActions = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: "Login"})
      ]
    });
    this.props.navigation.dispatch(navActions);
  }

  register = () => {
      
      var username = this.state.username.toString().replace(' ', '');
      var password = this.state.password.toString().replace(' ', '');
      //var res = false;
      

      if (username === '' || password === ''){
        alert('Please provide login and password');
      }
      else{
        
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .then(() => {

        }, (error) => {
          alert(error.message);
        });
        //alert('account created');

        this.props.navigation.navigate('Login');
      }      
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
  }
});