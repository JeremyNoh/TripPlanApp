import React from "react";

import { View, StyleSheet, ActivityIndicator } from "react-native";

export const Loading = props => {
  return (
    <View style={[styles.container, props.style]}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
