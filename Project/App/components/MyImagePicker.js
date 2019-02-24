import React from 'react';
import { Button, Image, View, TouchableOpacity } from 'react-native';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';

export default class MyImagePicker extends React.Component {
  /*state = {
    image: null,
  };*/

  constructor(props){
    super(props);
    this.state = {
      image:null,
    }
  }

  componentDidMount(){
    let user = firebase.auth().currentUser;
    var uri = null;
    //try retreive image uri

   //setTimeout(() => {
          firebase.database().ref("profile_pic/" + user.uid).once('value', function (data){
          //alert("uid:"+ user.uid +"\nREADING:" + data.val().uri);
          let val = data.val();
          if (val != null){
            uri = data.val().uri;  
          }
          
          //alert(uri);
        }).then(() => {
          this.setState({image: uri});
          //alert("state uri:" + this.state.uri);
        });
      //}, 5000);

 
  }

  render() {
    let { image } = this.state;

    if (image){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <TouchableOpacity
            onPress={this._pickImage}>
               {image &&
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </TouchableOpacity>
        </View>
        );
    }
    else{
      return(
        <Button
            title="Pick an image"
            onPress={this._pickImage}
          />
      );
    }


    /*return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );*/
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });

      //store image uri
      let user = firebase.auth().currentUser;
      //alert(user.uid);
      firebase.database().ref("profile_pic/" + user.uid).set(
        {
          uri: result.uri
        }
      ).then(() => {
        console.log("Image URI saved.");
      }).catch((error) => {
        alert(error);
      });
    }
  };
}