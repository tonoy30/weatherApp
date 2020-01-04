import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

class Search extends Component<{ placeholder: string; onSubmit: any }> {
  state = {
    text: ""
  };
  handleLocationChange = (newLocation: string) => {
    this.setState({ text: newLocation });
  };
  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;
    if (!text) return;
    onSubmit(text);
    this.setState({ text: "" });
  };
  render() {
    const { text } = this.state;
    const { placeholder } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text}
          placeholder={placeholder}
          placeholderTextColor="#fff"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleLocationChange}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 300,
    marginTop: 20,
    backgroundColor: "#666",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textInput: {
    flex: 1,
    color: "white"
  }
});
export default Search;
