import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { iconActions } from "../../assets/icons";

import { mainColor } from "../../utils/colors";
import { allDistance } from "../../utils/calculDistance";
const { height, width } = Dimensions.get("window");

const DistanceButton = ({ markers = [] }) => {
  const distance = allDistance(markers);

  return (
    <View style={styles.actionButtonIcon}>
      <Text style={styles.text}>{distance}</Text>
    </View>
  );
};

export default DistanceButton;

const styles = StyleSheet.create({
  actionButtonIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    borderRadius: 100,
    position: "absolute",
    // bottom: 20,
    top: 10,
    right: 10,

    backgroundColor: mainColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.05,
    shadowRadius: 1
  },
  text: { color: "white", fontWeight: "bold" }
});
