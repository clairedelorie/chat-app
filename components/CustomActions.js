import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import firebase from "firebase";

export default class CustomActions extends React.Component {
  // When the user clicks the + button, the onActionPress function is called which displays the extra options as buttons that can be clicked. When an option is clicked, one of the functions below is called
  onActionPress = () => {
    const options = [
      "Choose from Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    // The actionSheet will display the provided options, and will also note the index of the cancel button (so that it knows to close the menu when this button is clicked)
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            return this.pickImage();
          case 1:
            console.log("user wants to take a photo");
            return this.takePhoto();
          case 2:
            console.log("user wants to get their location");
            return this.getLocation();
          default:
        }
      }
    );
  };

  // Function which will allow the user to pick an image from their gallery. First ask for permission, then use the launchImageLibraryAsync function to pick an image.
  //  If it's not cancelled, then use the uploadImageFetch function to upload the image to Firestore, and use the onSend function from Chat.js to send it as a message through GiftedChat
  pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
      }).catch((error) => console.log(error));

      if (!result.cancelled) {
        const imageUrl = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageUrl });
      }
    }
  };

  // Function to take a photo with the devices camera. Ask for permissions to image storage and the device camera. If granted, then use the launchCameraAsync function to take the picture.
  //  If it's not cancelled, then use the uploadImageFetch function to upload the image to Firestore, and use the onSend function from Chat.js to send it as a message through GiftedChat
  takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: "Images",
      }).catch((error) => console.log(error));

      if (!result.cancelled) {
        const imageUrl = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageUrl });
      }
    }
  };

  // Function to share a users location. Ask for permissions to the devices location. If granted, then use the getCurrentPositionAsync function to get the users location from their device
  // Then use the onSend function from Chat.js to send the message through GiftedChat (using renderCustomView to render a custom map component)
  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      let result = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      }).catch((error) => console.log(error));
      const longitude = JSON.stringify(result.coords.longitude);
      const latitude = JSON.stringify(result.coords.latitude);
      if (result) {
        this.props.onSend({
          location: {
            longitude: result.coords.longitude,
            latitude: result.coords.latitude,
          },
        });
      }
    }
  };

  // Function to upload media to the Firestore database. First create a new XMLHttpRequest, and set it's responseType to blob (binary large object, used to store media in databases)
  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    // Create a reference to the firebase storage and use put to store the content from the AJAX request above
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    const snapshot = await ref.put(blob);

    // Close the connection
    blob.close();

    // Use getDownloadURL to get the image URL from storage, which will be passed to the onSend function in Chat.js to send the image as a message
    return await snapshot.ref.getDownloadURL();
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={this.onActionPress}
        accessible={true}
        accessibilityLabel="Extra chat options"
        accessibilityHint="This option allows you to take a new photo, send a photo from your album or share your location"
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
