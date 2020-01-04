import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";

import Weather from "./components/home/Weather";

class App extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="light-content" />
        <Weather />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default App;
