import React from "react";

import { Text, StyleSheet } from "react-native";

export const Title = props => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.title}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 40,
    // shadowOffset: { width: 1, height: 5 },
    shadowColor: "#FF5981"
    // shadowOpacity: 1
  }
});

export default Title;
