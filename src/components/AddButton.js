import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import { iconActions } from "../../assets/icons";

import { mainColor } from "../../utils/colors";

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.actionButtonIcon} onPress={() => onPress()}>
      <Image source={iconActions["add2"]} style={styles.sizeImg} />
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  actionButtonIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 20,
    right: 10,
    height: 70,
    backgroundColor: mainColor,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.05,
    shadowRadius: 1
  },
  sizeImg: { width: 50, height: 50 }
});
