import React from "react";
import { View, Text } from "react-native";

export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name;
    let backgroundColor = this.props.route.params.backgroundColor;

    this.props.navigation.setOptions({ title: name });
    this.props.navigation.setOptions({ backgroundColor: backgroundColor });

    return <View>{/* Rest of the UI */}</View>;
  }
}
