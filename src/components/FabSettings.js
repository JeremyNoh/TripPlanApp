import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import * as Animatable from "react-native-animatable";

import { iconActions } from "../../assets/icons";

const FabSettings = ({ onPress }) => {
  const [IsActive, setIsActive] = useState(false);
  if (IsActive) {
    return (
      <>
        <TouchableOpacity
          style={[styles.actionButtonIcon, { right: 15 }]}
          onPress={() => {
            setIsActive(false), onPress("settings");
          }}
        >
          <Image source={iconActions["settings2"]} style={styles.sizeImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButtonIcon, { right: 105 }]}
          onPress={() => {
            setIsActive(false), onPress("finish");
          }}
        >
          <Image source={iconActions["success"]} style={styles.sizeImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButtonIcon, { right: 195 }]}
          onPress={() => {
            setIsActive(false), onPress("goBack");
          }}
        >
          <Image source={iconActions["goBack"]} style={styles.sizeImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButtonIcon, { right: 285 }]}
          onPress={() => {
            setIsActive(false), onPress("trash");
          }}
        >
          <Image source={iconActions["trash"]} style={styles.sizeImg} />
        </TouchableOpacity>
      </>
    );
  }

  return (
    <TouchableOpacity
      style={styles.actionButtonIcon}
      onPress={() => {
        setIsActive(true), onPress("settings");
      }}
    >
      <Image source={iconActions["settings"]} style={styles.sizeImg} />
    </TouchableOpacity>
  );
};

export default FabSettings;

const styles = StyleSheet.create({
  actionButtonIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 20,
    right: 15,
    height: 70,
    backgroundColor: "white",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.05,
    shadowRadius: 1
  },
  sizeImg: { width: 40, height: 40 }
});
