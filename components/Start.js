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
} from "react-native";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", backgroundColor: "#B9C6AE" };
  }

  render() {
    return (
      //background image
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require("../Background-Image.png")}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.title}>LiveChat</Text>
          <View style={styles.container}>
            <View style={styles.textInputContainer}>
              <Image
                style={styles.textInputIcon}
                source={require("../icon.svg")}
              />
              <TextInput
                style={styles.namefield}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>

            {/*choose background color */}
            <View style={styles.chooseColorContainer}>
              <Text style={styles.chooseColor}>Choose Background Color:</Text>
              <View style={styles.backgroundColor}>
                <TouchableOpacity
                  style={[styles.color1]}
                  onPress={() => this.setState({ backgroundColor: "#090C08" })}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={[styles.color2]}
                  onPress={() => this.setState({ backgroundColor: "#474056" })}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={[styles.color3]}
                  onPress={() => this.setState({ backgroundColor: "#8A95A5" })}
                ></TouchableOpacity>
                <TouchableOpacity
                  style={[styles.color4]}
                  onPress={() => this.setState({ backgroundColor: "#B9C6AE" })}
                ></TouchableOpacity>
              </View>
            </View>
            {/*button to chat room */}
            <View>
              <TouchableOpacity
                style={[
                  styles.chatButton,
                  { backgroundColor: this.state.backgroundColor },
                ]}
                onPress={() =>
                  this.props.navigation.navigate("Chat", {
                    name: this.state.name,
                    backgroundColor: this.state.backgroundColor,
                  })
                }
              >
                <Text style={styles.chatButtonText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },

  imageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "600",
    width: "50%",
    height: "50%",
    flex: 0.7,
    textAlign: "center",
    marginTop: 90,
  },

  container: {
    width: "88%",
    height: "44%",
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    display: "flex",
  },

  namefield: {
    color: "#757083",
    top: 25,
    height: 60,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "300",
    paddingLeft: 45,
    borderColor: "#777",
    opacity: 0.5,
  },

  textInputContainer: {
    flex: 1,
    width: "88%",
  },

  textInputIcon: {
    position: "absolute",
    top: 45,
    left: 15,
  },

  chooseColorContainer: {
    position: "absolute",
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },

  chooseColor: {
    fontWeight: "300",
    fontSize: 16,
    color: "#757083",
    opacity: 100,
    alignSelf: "center",
  },

  color1: {
    backgroundColor: "#090C08",
    width: 45,
    height: 45,
    margin: 10,
    marginTop: 0,
    borderRadius: 45 / 2,
  },

  color2: {
    backgroundColor: "#474056",
    width: 45,
    height: 45,
    margin: 10,
    marginTop: 0,
    borderRadius: 45 / 2,
  },

  color3: {
    backgroundColor: "#8A95A5",
    width: 45,
    height: 45,
    margin: 10,
    marginTop: 0,
    borderRadius: 45 / 2,
  },

  color4: {
    backgroundColor: "#B9C6AE",
    width: 45,
    height: 45,
    margin: 10,
    marginTop: 0,
    borderRadius: 45 / 2,
  },

  backgroundColor: {
    flexDirection: "row",
    marginTop: 15,
  },

  chatButton: {
    flex: 1,
    position: "absolute",
    bottom: 25,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#757083",
    width: "88%",
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    opacity: 0.9,
  },

  chatButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
