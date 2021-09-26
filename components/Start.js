import React from "react";
import {
  ImageBackground,
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", backgroundColor: "#B9C6AE" };
  }

  startChatting = (name, backgroundColor) => {
    this.props.navigation.navigate("Chat", {
      name: this.state.name,
      backgroundColor: this.state.backgroundColor,
    });
  };

  render() {
    return (
      //background image
      <View style={styles.mainContainer}>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="cover"
          source={require("../Background-Image.png")}
        >
          <View style={styles.titleBox}>
            <Text style={styles.title}>LiveChat</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.container}>
              <View style={styles.textInputContainer}>
                <Image
                  style={styles.textInputIcon}
                  source={require("../A5_project_assets/icon.svg")}
                />
                <TextInput
                  style={styles.namefield}
                  /* when user enters their name, change the name state to their name */

                  onChangeText={(name) => this.setState({ name })}
                  value={this.state.name}
                  placeholder="Your Name"
                />
              </View>

              {/*choose background color */}

              <Text style={styles.chooseColor}>Choose Background Color:</Text>
              <View style={styles.chooseColorContainer}>
                <TouchableOpacity
                  style={[styles.setColor, { backgroundColor: "#090C08" }]}
                  onPress={() => this.setState({ backgroundColor: "#090C08" })}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={[styles.setColor, { backgroundColor: "#474056" }]}
                  onPress={() => this.setState({ backgroundColor: "#474056" })}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={[styles.setColor, { backgroundColor: "#8A95A5" }]}
                  onPress={() => this.setState({ backgroundColor: "#8A95A5" })}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={[styles.setColor, { backgroundColor: "#B9C6AE" }]}
                  onPress={() => this.setState({ backgroundColor: "#B9C6AE" })}
                ></TouchableOpacity>
              </View>

              {/*button to chat room */}

              <Pressable
                style={[styles.chatButton]}
                title="Start Chatting"
                //send name and background color state when user clicks start chatting button
                onPress={() =>
                  this.props.navigation.navigate("Chat", {
                    name: this.state.name,
                    backgroundColor: this.state.backgroundColor,
                  })
                }
              >
                <Text style={styles.chatButtonText}>Start Chatting</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  imageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
  },

  titleBox: {
    flex: 56,
    justifyContent: "center",
    textAlign: "center",
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },

  infoBox: {
    flex: 44,
    alignItems: "center",
  },

  container: {
    height: 250,
    backgroundColor: "white",
    width: "88%",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 15,
    paddingBottom: 15,
  },

  textInputContainer: {
    width: "88%",
  },

  textInputIcon: {
    height: 20,
    width: 20,
    position: "absolute",
    top: 15,
    left: 12,
    opacity: 0.5,
  },

  namefield: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
    padding: 10,
    paddingLeft: 45,
  },

  chooseColorContainer: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  chooseColor: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },

  setColor: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  chatButton: {
    height: 50,
    backgroundColor: "#757083",
    width: "88%",
    justifyContent: "center",
  },

  chatButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
