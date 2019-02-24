import React from 'react';
import { StyleSheet, 
          Text, 
          View,
} from 'react-native';
import MyImagePicker from './MyImagePicker';
import * as firebase from 'firebase';

export default class Profile extends React.Component {

    componentDidMount(){
      //this._loadInitialState().done();
  }

  render() {
    //alert(firebase.auth().currentUser.uid);
    return (
        <View style={styles.container}>
          <Text style={styles.text}>- Welcome to your Pokedex -</Text>

          <MyImagePicker/>

        </View>

    );
  }



}

const styles = StyleSheet.create({
    container : {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2896d3'
    },
    text:{
      color: '#fff'
    }
});